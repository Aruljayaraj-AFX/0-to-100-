from fastapi import HTTPException,Request,Depends,status
from fastapi.security import HTTPBearer,HTTPAuthorizationCredentials
from jose import jwt, JWTError, ExpiredSignatureError
from typing import Optional
from models.info import User
from models.user import User_info,teacher_info
from models.otp import otp
from database.DB import get_db 
from sqlalchemy.orm import Session
import os
import smtplib
from datetime import datetime,timedelta
from utils.security import hash_password,decode,hashword
from utils.security import verify_password
from schema.role import RoleEnum
from fastapi import HTTPException, status
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from dotenv import load_dotenv
import random
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


load_dotenv()
ACCESS_TOKEN_EXPIRE_MINUTE = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
SECRET_KEY = str(os.getenv("SECRT_KEY"))
ALGORITHM = str(os.getenv("ALGORITHM"))


def generate_unique_user_id(generated_ids):
    while True:
        random_number = random.randint(100000, 999999)
        u_id = random_number
        if u_id not in generated_ids:
            generated_ids.add(u_id)
            return u_id
        
async def new_user(type_sig:str,data:dict,email: str, password: str, role: str, db):
    try:
        all=db.query(User).all()
        generated_ids = {user.userid for user in all}
        userid =  generate_unique_user_id(generated_ids)
        existing_user = db.query(User).filter(User.email == email).first()
        if existing_user:
            if type_sig in ["GOOGLE","FACEBOOK","GIT"] and existing_user.type_sig==type_sig:
                response = await userin(login_req=type_sig,email=email, password=type_sig,db=db)
                return {
                    "type_sig": type_sig,
                    "message": "User already registered, logged in successfully",
                    "user_id": existing_user.userid,
                    "email": existing_user.email,
                    "login":response
                }
            raise HTTPException(status_code=status.HTTP_409_CONFLICT,detail="Email already registered")
        try:
            if (role=="TEACHER" or role==  "STUDENT"):
                role=role
            else:
                raise ValueError("Invalid role")
        except ValueError:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Invalid role")
        hashed_password = hash_password(password)
        new_user = User(userid=userid ,email=email, password=hashed_password, role=role,type_sig=type_sig)
        if type_sig=="NORMAL":
            if role=="STUDENT":
                new_user_form = User_info(userid=userid, role=role)
            elif role=="TEACHER":
                new_user_form = teacher_info(userid=userid, role=role)
        elif type_sig=="GOOGLE":
            if role=="STUDENT":
                new_user_form = User_info(userid=userid, role=role,fullname=data)
            elif role=="TEACHER":
                new_user_form = teacher_info(userid=userid, role=role,fullname=data)
        elif type_sig=="FACEBOOK":
            if role=="STUDENT":
                new_user_form = User_info(userid=userid, role=role,fullname=data)
            elif role=="TEACHER":
                new_user_form = teacher_info(userid=userid, role=role,fullname=data)
        elif type_sig=="GIT":
            if role=="STUDENT":
                new_user_form = User_info(userid=userid, role=role,fullname=data)
            elif role=="TEACHER":
                new_user_form = teacher_info(userid=userid, role=role,fullname=data)
        db.add_all([new_user,new_user_form])
        db.commit()
        db.refresh(new_user)
        if type_sig in ["GOOGLE","FACEBOOK","GIT"]:
            response = await userin(login_req=type_sig,email=email, password=type_sig,db=db)
        else:
            response = await userin(login_req="NORMAL",email=email, password=password,db=db)
        return {
            "type_sig": type_sig,
            "message": "User created successfully",
            "user_id": new_user.userid,
            "email": new_user.email,
            "login":response
        }
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,detail=f"Database integrity error{str(e)}")

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail=f"{str(e)}")
    finally:
        db.close()

def create_access_token(email:str,role:str):
    try:
        expire=datetime.utcnow()+timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTE)
        payload={
            "sub":email,
            "role":role,
            "exp":expire
        }
        return hashword(payload)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail=f"Token generation error: {str(e)}")


async def userin(login_req:str,email: str, password: str, db):
    try:
        if login_req not in ["NORMAL","GOOGLE","FACEBOOK","GIT"]:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail=f"Invalid login request{login_req}")
        user = db.query(User).filter(User.email == email).first()
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="User not found")
        if login_req == "NORMAL":
            if not verify_password(password, user.password):
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail=f"Invalid password{str([password,user.password])}")
        token = create_access_token(email=user.email,role=user.role)
        return {
            "message": "Login successful",
            "user_id": user.userid,
            "token":token,
            "token_type":"bearer",
            "expire":datetime.utcnow()+timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTE)
        }

    except SQLAlchemyError as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail=f"{str(e)}")
    
    finally:
        db.close()


class user_Authorization(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(user_Authorization, self).__init__(auto_error=auto_error)
    async def __call__(self, request: Request , db: Session = Depends(get_db)):
        credentials: HTTPAuthorizationCredentials = await super(user_Authorization, self).__call__(request)
        if not credentials:
            raise HTTPException(status_code=403, detail="Invalid aauthorization code")
        token = decode(credentials.credentials)
        print(token)
        try:
            result=db.query(User).filter(User.email==token['sub']).first()
            db.close()
            try:
                if result:
                    return token
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
        except:
            raise HTTPException(status_code=403, detail="Invalid authorization code")    

def send_otp_email(user,otp,db):
    sender_email = "aruljayarajj826@gmail.com"
    subject = "Your OTP Code"
    print(user)
    try:
        check=db.query(User.email).filter(User.email== user).first()
        if not check:
            raise HTTPException(status_code=404, detail="Email not found")
        body = f"""<html>
<body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
    <div style="max-width: 400px; margin: auto; background: white; border-radius: 10px; padding: 30px; text-align: center; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png" width="50" style="margin-bottom: 15px;">
        <h2 style="color:#333;">0 to 100%</h2>
        <p style="font-size: 18px;">Use the OTP below to verify your account:</p>
        <div style="font-size: 28px; font-weight: bold; margin: 20px 0; color: #4CAF50;">{otp}</div>
        <p style="color: #777;">This code will expire in 10 minutes.<br>
        If you didn’t request this, please ignore this email.</p>
    </div>
</body>
</html>

        """
        sender_password = os.getenv('EMAIL_PASSWORD')
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = user
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'html'))
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email,user, msg.as_string())
        server.quit()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"error: {str(e)}")
    return True

async def forget_otp_sent(email: str, db):
    try:
        user = db.query(User).filter(User.email == email).first()
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="User not found")
        otp_value = random.randint(100000, 999999)
        if not send_otp_email(user.email,otp_value,db):
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Failed to send OTP email")
        new_otp = otp(user=user.email, otp=otp_value)
        db.add(new_otp)
        db.commit()
        db.refresh(new_otp)
        return {
            "message": "OTP sent successfully"
        }
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail=f"{str(e)}")
    finally:
        db.close()

async def check_otp(email: str, otp_value: int, db):
    try:
        user_otp = db.query(otp).filter(otp.user == email, otp.otp == otp_value).first()
        if not user_otp:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Invalid OTP or email")
        current_time = datetime.utcnow().timestamp()
        if current_time - user_otp.created_at > 600:
            db.delete(user_otp)
            db.commit()
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="OTP has expired")
        db.delete(user_otp)
        db.commit()
        return {
            "message": "OTP verified successfully"
        }
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail=f"{str(e)}")
    finally:
        db.close()

async def new_pass(email: str, new_password: str, db):
    try:
        user = db.query(User).filter(User.email == email).first()
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="User not found")
        hashed_password = hash_password(new_password)
        user.password = hashed_password
        user.type_sig="NORMAL"
        db.commit()
        db.refresh(user)
        return {
            "message": "Password updated successfully"
        }
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail=f"{str(e)}")
    finally:
        db.close()