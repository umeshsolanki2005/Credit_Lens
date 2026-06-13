from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models.user import User
from schemas.auth_schema import UserRegister, UserLogin, UserProfileUpdate
from auth.hashing import hash_password, verify_password
from auth.jwt_handler import create_access_token
from auth.oauth2 import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register")
def register(user: UserRegister, db: Session = Depends(get_db)):

    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    new_user = User(
        name=user.name,
        email=user.email,
        password_hash=hash_password(user.password),
        role=user.role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully",
        "user_id": new_user.id
    }

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    db_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    if not verify_password(
            user.password,
            db_user.password_hash):

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    access_token = create_access_token(
        {
            "sub": db_user.email,
            "email": db_user.email,
            "name": db_user.name,
            "role": db_user.role,
            "id": db_user.id
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


@router.put("/profile")
def update_profile(
    profile: UserProfileUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    db_user = db.query(User).filter(User.id == current_user["id"]).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    db_user.income = profile.income
    db_user.employment_days = profile.employment_days
    db_user.age = profile.age
    
    db.commit()
    return {"message": "Profile updated successfully"}