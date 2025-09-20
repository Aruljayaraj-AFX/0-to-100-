from sqlalchemy import Column, Integer, String ,Text,DateTime,func,Enum,JSON
from sqlalchemy.orm import declarative_base
from schema.role import RoleEnum
from sqlalchemy import Enum

Base2 = declarative_base()

class User_info(Base2):
    __tablename__ = 'users_profile'
    userid = Column(Integer,primary_key=True)
    fullname = Column(String(50),nullable=True)
    about_me = Column(Text,nullable=True)
    dob = Column(DateTime,nullable=True)
    state = Column(String(50),nullable=True)
    country = Column(String(50),nullable=True)
    district = Column(String(50),nullable=True)
    classs = Column(String(50),nullable=True)
    school = Column(String(100),nullable=True)
    Average = Column(Integer,nullable=True)
    phone = Column(String(15),unique=True,nullable=True)
    role = Column(Enum(RoleEnum), nullable=False)
    created_at = Column(DateTime, default=func.now())


Base3 = declarative_base()

class teacher_info(Base3):
    __tablename__ = 'teacher_profile'
    userid = Column(Integer,primary_key=True)
    fullname = Column(String(50),nullable=True)
    about_me = Column(Text,nullable=True)
    dob = Column(DateTime,nullable=True)
    state = Column(String(50),nullable=True)
    country = Column(String(50),nullable=True)
    district = Column(String(50),nullable=True)
    school = Column(String(100),nullable=True)
    phone = Column(String(15),unique=True,nullable=True)
    role = Column(Enum(RoleEnum), nullable=False)
    created_at = Column(DateTime, default=func.now())