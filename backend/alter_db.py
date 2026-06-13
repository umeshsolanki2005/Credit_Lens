import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)

with engine.connect() as conn:
    try:
        conn.execute(text("ALTER TABLE users ADD COLUMN income INTEGER;"))
        conn.execute(text("ALTER TABLE users ADD COLUMN employment_days INTEGER;"))
        conn.execute(text("ALTER TABLE users ADD COLUMN age INTEGER;"))
        conn.execute(text("ALTER TABLE users ADD COLUMN amt_credit INTEGER DEFAULT 0;"))
        conn.execute(text("ALTER TABLE users ADD COLUMN amt_annuity INTEGER DEFAULT 0;"))
        conn.commit()
        print("Successfully added columns to users table.")
    except Exception as e:
        print(f"Error: {e}")
