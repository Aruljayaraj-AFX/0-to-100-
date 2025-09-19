from fastapi import APIRouter,HTTPException,Depends,Query,Request
from database.DB import session,get_db
from sqlalchemy.orm import Session
from models.User import User
from schema.role import RoleEnum
from services.UserService import new_user,userin,user_Authorization,forget_otp_sent,verify_otp,new_pass
from starlette.responses import RedirectResponse, JSONResponse
from authlib.integrations.starlette_client import OAuth
import os


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

@router.post("forget_password")
async def forget_password(email: str , db:Session =Depends(get_db)):
    return await forget_otp_sent(email=email,db=db)

@router.delete("verify_otp")
async def check_otp(email: str, otp: int, db:Session =Depends(get_db)):
    return await verify_otp(email=email,otp_value=otp,db=db)

@router.put("reset_password")
async def reset_password(email: str, new_password: str, db:Session =Depends(get_db)):
    return await new_pass(email=email,new_password=new_password,db=db)


oauth = OAuth()
oauth.register(
    name="google",
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'}
)


@router.get("/login/google")
async def login_google(request: Request):
    redirect_uri = request.url_for('auth_google')
    return await oauth.google.authorize_redirect(request, redirect_uri)

@router.get("/auth/google/callback")
async def auth_google(request: Request):
    token = await oauth.google.authorize_access_token(request)
    user_info = token['userinfo']
    return JSONResponse(user_info)