from sqlalchemy import Column, Integer, String ,Text,DateTime,func,Enum
from sqlalchemy.orm import declarative_base
from schema.role import RoleEnum
from sqlalchemy import Enum

Basee = declarative_base()

class User(Basee):
    __tablename__ = 'users_info'
    userid = Column(Integer,primary_key=True)
    email = Column(String(50),unique=True,nullable=False)
    type_sig = Column(String,nullable=False)
    password= Column(String(100),nullable=False)
    role = Column(Enum(RoleEnum), nullable=False)
    created_at = Column(DateTime, default=func.now())