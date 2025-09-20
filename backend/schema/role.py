from enum import Enum

class RoleEnum(str,Enum):
    ADMIN  = "TEACHER"
    USER = "STUDENT"

class user_info():
    email:str
    password:str
    role:str

class user_profile():
    fullname:str
    about_me:str
    dob:str
    state:str
    country:str
    district:str
    classs:str
    school:str
    Average:int
    phone:str
    role:RoleEnum

class teacher_profile():
    fullname:str
    about_me:str
    dob:str
    state:str
    country:str
    district:str
    school:str
    phone:str
    role:RoleEnum