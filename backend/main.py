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

app = FastAPI()

# 👇 Add this before defining your routes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # or specify ["http://localhost:3000"] for more security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/register")
async def register(user: UserCreate, db: Session = Depends(get_db)):
    new_user = User(email=user.email, password=user.password, preferences=user.preferences)
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
    email: str,  # Still from query params
    pref_data: PreferenceUpdate,  # This will grab JSON body
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.preferences = pref_data.preferences
    db.commit()
    return {"message": "Preferences updated"}


@app.post("/login")
async def login(email: str, password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user or user.password != password:  # Add hashing in production
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful"}