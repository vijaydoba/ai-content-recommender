import pandas as pd
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Job
def load_data():
    df = pd.read_csv("../model/jobs.csv")
    db = SessionLocal()
    for _, row in df.iterrows():
        job = Job(
            id=row["Job ID"],
            title=row["Job Title"],
            company=row["Company"],
            location=row["Location"],
            description=row["Description"],
            skills=row["Skills"],
            salary=row["Salary"],
            url=row["URL"]
        )
        db.add(job)
    db.commit()
    db.close()
if __name__ == "__main__":
    load_data()