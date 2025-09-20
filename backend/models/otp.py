from sqlalchemy import Column, Integer, func, String
from sqlalchemy.orm import declarative_base

Basee1 = declarative_base()

class otp(Basee1):
    __tablename__ = 'otp'
    user = Column(String(100),primary_key=True, index=True)
    otp = Column(Integer, nullable=False)
    created_at = Column(Integer, server_default=func.extract('epoch', func.now()), nullable=False)