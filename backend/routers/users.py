from fastapi import APIRouter,HTTPException,Depends,Query
from database.DB import session,get_db
from sqlalchemy.orm import Session
from models.User import User
from schema.role import RoleEnum
from services.UserService import new_user,userin,user_Authorization


router = APIRouter()

@router.post("/new_create_user")
async def create_user(email:str,password:str,db:Session=Depends(get_db),role:RoleEnum = Query(..., description="select the role")):
    res = await new_user(email=email,password=password,role=role,db=db)
    return res

@router.get("Login_user")
async def Login_user(email: str , password:str, db:Session =Depends(get_db)):
    res = await userin(email=email,password=password,db=db)
    return res

@router.get("/security_check/")
async def read(token: object = Depends(user_Authorization())):
    return token 

"""@router.get("forget_password")
async def forget_password(email: str , db:Session =Depends(get_db)):
    return forget_otp_sent(email=email,db=db)"""