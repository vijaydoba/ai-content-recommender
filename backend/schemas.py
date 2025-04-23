from pydantic import BaseModel, EmailStr
from typing import List, Optional

class UserCreate(BaseModel):
    email: str
    password: str
    preferences: Optional[List[str]] = []

class UserLogin(BaseModel):
    email: str  # Ensure email is properly validated
    password: str

class PreferenceUpdate(BaseModel):
    preferences: List[str]
