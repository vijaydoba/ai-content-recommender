from pydantic import BaseModel
from typing import List

class UserCreate(BaseModel):
    email: str
    password: str
    preferences: List[str]

class UserLogin(BaseModel):
    email: str
    password: str

class PreferenceUpdate(BaseModel):
    preferences: List[str]
