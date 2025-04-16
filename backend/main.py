import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from models import User, Content
from database import get_db
from model.recommender import recommend

app = FastAPI()
@app.post("/register")
async def register(email: str, password: str, preferences: list, db: Session = Depends(get_db)):
    user = User(email=email, password=password, preferences=preferences)
    db.add(user)
    db.commit()
    db.refresh(user)
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