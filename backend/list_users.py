import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)

with engine.connect() as conn:
    try:
        res = conn.execute(text("SELECT id, name, role FROM users;")).fetchall()
        for r in res:
            print(r)
    except Exception as e:
        print(f"Error: {e}")
