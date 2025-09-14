from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DB_URL = "postgresql://postgres.ytqdhuyfofcknifzhixf:Arul123@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres"

engine = create_engine(DB_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
session = SessionLocal()
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()