from passlib.context import CryptContext
from dotenv import load_dotenv 
import os
from jose import jwt 
from fastapi import HTTPException

load_dotenv()

token_expiry_minutes = os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES')
algorithm = os.getenv('ALGORITHM')
secret_key = os.getenv('SECRET_KEY')

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

def hashword(token):
    return jwt.encode(token, secret_key , algorithm=algorithm)

def decode(token):
    try:
        return jwt.decode(token,secret_key, algorithms=[algorithm])
    except Exception as e:
        raise Exception(f"{str(e)}")