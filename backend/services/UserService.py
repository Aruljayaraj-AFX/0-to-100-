from fastapi import HTTPException,Request,Depends,status
from fastapi.security import HTTPBearer,HTTPAuthorizationCredentials
from jose import jwt, JWTError, ExpiredSignatureError
from typing import Optional
from models.User import User
from database.DB import get_db
from sqlalchemy.orm import Session
import os
from datetime import datetime,timedelta
from utils.security import hash_password,decode,hashword
from utils.security import verify_password
from schema.role import RoleEnum
from fastapi import HTTPException, status
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from dotenv import load_dotenv
import random


load_dotenv()
ACCESS_TOKEN_EXPIRE_MINUTE = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
SECRET_KEY = str(os.getenv("SECRT_KEY"))
ALGORITHM = str(os.getenv("ALGORITHM"))


async def generate_unique_user_id(generated_ids):
    while True:
        random_number = random.randint(100000, 999999)
        u_id = random_number
        if u_id not in generated_ids:
            generated_ids.add(u_id)
            return u_id
        
async def new_user(email: str, password: str, role: str, db):
    try:
        all=db.query(User).all()
        generated_ids = {user.userid for user in all}
        userid = await generate_unique_user_id(generated_ids)
        existing_user = db.query(User).filter(User.email == email).first()
        if existing_user:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Email already registered")
        try:
            if (role=="ADMIN" or role=="USER"):
                role=role
            else:
                raise ValueError("Invalid role")
        except ValueError:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Invalid role")
        hashed_password = hash_password(password)
        new_user = User(userid=userid ,email=email, password=hashed_password, role=role)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return {
            "message": "User created successfully",
            "user_id": new_user.userid,
            "email": new_user.email,
        }
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,detail="Database integrity error")

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


async def userin(email: str, password: str, db):
    try:
        user = db.query(User).filter(User.email == email).first()
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="User not found")

        if not verify_password(password, user.password):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Invalid password")

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