from fastapi import APIRouter,HTTPException,Depends,Query,Request
from database.DB import session,get_db
from sqlalchemy.orm import Session
from models.info import User
from schema.role import RoleEnum
from services.UserService import new_user,userin,user_Authorization,forget_otp_sent,check_otp,new_pass
from starlette.responses import RedirectResponse
from authlib.integrations.starlette_client import OAuth
import os
from starlette.config import Config
from typing import Optional
import json
from urllib.parse import urlencode

router = APIRouter()

@router.post("/new_create_user")
async def create_user(
    email: str,
    password: str,
    role: RoleEnum,
    type_sig:Optional[str]="NORMAL",
    data:Optional[str]=None,
    db: Session = Depends(get_db)
):
    print(password)
    res = await new_user(data=data,type_sig=type_sig,email=email, password=password, role=role, db=db)
    return res


oauth = OAuth()
oauth.register(
    name="google",
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'}
)
@router.get("/login/google", include_in_schema=True)
async def login_google(request: Request,act:str, type_role: RoleEnum = Query(..., description="Role must be either 'TEACHER' or 'STUDENT'")):
    redirect_uri = request.url_for('auth_google')
    state = json.dumps({"type_role": type_role,"act": act})
    return await oauth.google.authorize_redirect(request, redirect_uri, state=state)

@router.get("/auth/google/callback", include_in_schema=True)
async def auth_google(request: Request, db: Session = Depends(get_db)):
    token = await oauth.google.authorize_access_token(request)
    user_info = token['userinfo']
    state = json.loads(request.query_params.get('state'))
    type_role = RoleEnum(state["type_role"])
    act_test = state.get("act")
    if act_test == "signup":
        response = await new_user(
        email=user_info["email"],
        password="GOOGLE",
        role=type_role,
        type_sig="GOOGLE",
        db=db,
        data=user_info["name"]
        )
        if (response.get("login", {}).get("message") == "Login successful" )& (response.get("message") == "User created successfully"):
            params = {
            "token": response['login']['token'],
            "message": response.get("message", "")
            }
            frontend_url = f"http://localhost:5173/signup?{urlencode(params)}"
            return RedirectResponse(url=frontend_url)
        elif response.get("message") == "User already exists, logged in successfully":
            params = {
            "token": response['login']['token'],
            "message": response.get("message", "")
            }
            frontend_url = f"http://localhost:5173/signup?{urlencode(params)}" 
            return RedirectResponse(url=frontend_url)
        else:
            params = {
            "message": response.get("message", "")
            }
            frontend_url = f"http://localhost:5173/signup?{urlencode(params)}"
            return RedirectResponse(url=frontend_url)

    elif act_test == "login":
        response = await userin(login_req="GOOGLE",email=user_info["email"], password="GOOGLE", db=db)
        if response.get("login", {}).get("message") == "Login successful":
            frontend_url = f"http://localhost:5173/login?token={response['login']['token']}"
            return RedirectResponse(url=frontend_url)

config = Config(".env")

oauth1 = OAuth(config)
oauth1.register(
    name='facebook',
    client_id=config('FACEBOOK_CLIENT_ID'),
    client_secret=config('FACEBOOK_CLIENT_SECRET'),
    access_token_url='https://graph.facebook.com/v16.0/oauth/access_token',
    authorize_url='https://www.facebook.com/v16.0/dialog/oauth',
    api_base_url='https://graph.facebook.com/v16.0/',
    client_kwargs={'scope': 'email public_profile'}
)

@router.get("/login/facebook", include_in_schema=True)
async def login_facebook(
    request: Request,
    act: str,
    type_role: RoleEnum = Query(..., description="Role must be either 'TEACHER' or 'STUDENT'")
):
    facebook = oauth1.create_client('facebook')
    redirect_uri = request.url_for("facebook_callback")  # use same host dynamically

    # Store state (role + act)
    state = json.dumps({"type_role": type_role.value, "act": act})

    return await facebook.authorize_redirect(request, redirect_uri, state=state)


@router.get("/auth/facebook/callback", include_in_schema=True)
async def facebook_callback(
    request: Request,
    db: Session = Depends(get_db)
):
    facebook = oauth1.create_client('facebook')
    token = await facebook.authorize_access_token(request)

    # Extract state safely
    raw_state = request.query_params.get('state')
    if not raw_state:
        raise HTTPException(status_code=400, detail="Missing 'state' parameter")
    try:
        state = json.loads(raw_state)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid 'state' parameter format")

    type_role = RoleEnum(state["type_role"])
    act_test = state.get("act")

    # Fetch user info from Facebook
    resp = await facebook.get(
        "me",
        params={"fields": "id,name,email,first_name,last_name,picture"},
        token=token
    )
    user_info = resp.json()

    if "email" not in user_info:
        raise HTTPException(status_code=400, detail="Email not returned by Facebook")

    # --- SIGNUP FLOW ---
    if act_test == "signup":
        response = await new_user(
            email=user_info["email"],
            password="FACEBOOK",
            role=type_role,
            type_sig="FACEBOOK",
            db=db,
            data=user_info["name"]
        )

        if (response.get("login", {}).get("message") == "Login successful") & (
            response.get("message") == "User created successfully"
        ):
            params = {
                "token": response['login']['token'],
                "message": response.get("message", "")
            }
            frontend_url = f"http://localhost:5173/signup?{urlencode(params)}"
            return RedirectResponse(url=frontend_url)

        elif response.get("message") == "User already exists, logged in successfully":
            params = {
                "token": response['login']['token'],
                "message": response.get("message", "")
            }
            frontend_url = f"http://localhost:5173/signup?{urlencode(params)}"
            return RedirectResponse(url=frontend_url)

    # --- LOGIN FLOW ---
    elif act_test == "login":
        response = await userin(
            login_req="FACEBOOK",
            email=user_info["email"],
            password="FACEBOOK",
            db=db
        )
        if response.get("login", {}).get("message") == "Login successful":
            frontend_url = f"http://localhost:5173/login?token={response['login']['token']}"
            return RedirectResponse(url=frontend_url)

    # fallback
    raise HTTPException(status_code=400, detail="Invalid action or unexpected response")


oauth2 = OAuth()
oauth2.register(
    name='github',
    client_id='Ov23liXb1Uz7SSM0UlU4',
    client_secret='b6f6dd4b927e87d854cec7f3bc66e258dca904ce',
    access_token_url='https://github.com/login/oauth/access_token',
    authorize_url='https://github.com/login/oauth/authorize',
    api_base_url='https://api.github.com/',
    client_kwargs={'scope': 'user:email'},
)

@router.get("/login/github", include_in_schema=True)
async def login_github(request: Request,act:str,type_role: RoleEnum = Query(..., description="Role must be either 'TEACHER' or 'STUDENT'")):
    redirect_uri = request.url_for('github_callback')
    state = json.dumps({"type_role": type_role.value,"act": act})
    return await oauth2.github.authorize_redirect(request, redirect_uri, state=state)

@router.get("/auth/git/callback")
async def github_callback(
    request: Request,
    db: Session = Depends(get_db)
):
    github = oauth2.create_client('github')
    token = await github.authorize_access_token(request)

    # Get user profile info
    resp = await github.get('user', token=token)
    user_info = resp.json()

    # Get primary email — GitHub requires separate API call
    email_resp = await github.get('user/emails', token=token)
    emails = email_resp.json()

    primary_email = None
    for e in emails:
        if e.get("primary") and e.get("verified"):
            primary_email = e.get("email")
            break

    if not primary_email:
        raise HTTPException(status_code=400, detail="No verified primary email found from GitHub")

    # Get and validate state
    raw_state = request.query_params.get('state')
    if not raw_state:
        raise HTTPException(status_code=400, detail="Missing 'state' parameter")
    try:
        state = json.loads(raw_state)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid 'state' parameter format")

    # Validate role
    try:
        type_role = RoleEnum(state["type_role"])
    except KeyError:
        raise HTTPException(status_code=400, detail="'type_role' missing from state")
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid 'type_role' value")

    # Call your user creation logic
    act_test = state.get("act")
    if act_test == "signup":
        response = await new_user(
        email=primary_email,
        password="GIT",
        role=type_role,
        type_sig="GIT",
        db=db,
        data=user_info.get("name", "GitHub User")
        )
        return response
    elif act_test == "login":
        response = await userin(login_req="GIT",email=primary_email, password="GIT", db=db)
        return response

@router.get("Login_user")
async def Login_user(login_req:str,email:str,password:str, db:Session =Depends(get_db)):
    res = await userin(login_req=login_req,email=email, password=password,db=db)
    return res
@router.get("/security_check/")
async def read(token: object = Depends(user_Authorization())):
    return token 

@router.post("forget_password")
async def forget_password(email: str , db:Session =Depends(get_db)):
    return await forget_otp_sent(email=email,db=db)

@router.delete("verify_otp")
async def verify_otp(email: str, otp: int, db:Session =Depends(get_db)):
    return await check_otp(email=email,otp_value=otp,db=db)

@router.put("reset_password")
async def reset_password(email: str, new_password: str, db:Session =Depends(get_db)):
    return await new_pass(email=email,new_password=new_password,db=db)

