from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Define the Base class for declarative models
Base = declarative_base()

SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://root:Vijay%40123@127.0.0.1/content_app"

# Create the database engine
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# SessionLocal is the session maker to interact with the database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
