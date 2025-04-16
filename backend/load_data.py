import pandas as pd
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Content
def load_data():
    df = pd.read_csv("../model/data/articles.csv")
    db = SessionLocal()
    for _, row in df.iterrows():
        content = Content(
            id=row["id"], title=row["title"], category=row["category"],
            description=row["description"], url=row["url"]
        )
        db.add(content)
    db.commit()
    db.close()
if __name__ == "__main__":
    load_data()