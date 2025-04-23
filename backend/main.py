import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from models import User, Content
from database import get_db
from model.recommender import recommend
from schemas import UserCreate, UserLogin, PreferenceUpdate
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import Column, String, Integer, JSON
from database import Base
import bcrypt


app = FastAPI()

# 👇 Add this before defining your routes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ← Temporarily allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/register")
async def register(user: UserCreate, db: Session = Depends(get_db)):
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    new_user = User(email=user.email, password=hashed_password, preferences=user.preferences)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered"}



@app.get("/content")
async def get_content(db: Session = Depends(get_db)):
    return db.query(Content).all()

#recommand 

@app.get("/recommendations")
async def get_recommendations(email: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return recommend(user.preferences)

@app.put("/preferences")
async def update_preferences(
    email: str,
    pref_data: PreferenceUpdate,  # Get preferences from the body
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.preferences = pref_data.preferences  # Update preferences
    db.commit()
    return {"message": "Preferences updated"}



@app.post("/login")
async def login(user: UserLogin, db: Session = Depends(get_db)):
    user_in_db = db.query(User).filter(User.email == user.email).first()
    if not user_in_db or not bcrypt.checkpw(user.password.encode('utf-8'), user_in_db.password.encode('utf-8')):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful"}


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)  # In production, use hashed password (e.g., bcrypt)
    preferences = Column(JSON)  # Assuming preferences are stored as JSON

class Content(Base):
    __tablename__ = "content"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    category = Column(String)