from sqlalchemy import Column, Integer, String ,Text,DateTime,func,Enum
from sqlalchemy.orm import declarative_base
from schema.role import RoleEnum
from sqlalchemy import Enum

Base = declarative_base()

class User(Base):
    __tablename__ = 'users_info'
    userid = Column(Integer,primary_key=True)
    role = Column(Enum(RoleEnum), nullable=False)
    email = Column(String(50),unique=True,nullable=False)
    password= Column(String(100),nullable=False)
    fullname=Column(String(50),nullable=True)
    profile_pic=Column(Text,nullable=True)
    Profession=Column(String(50),nullable=True)
    phone_no=Column(Integer,nullable=True)
    City=Column(String(50),nullable=True)
    created_at = Column(DateTime, default=func.now())

