from sqlalchemy import Enum
from enum import Enum

class RoleEnum(str,Enum):
    ADMIN = "ADMIN"
    USER = "USER"

class user_info():
    email:str
    password:str
    role:str