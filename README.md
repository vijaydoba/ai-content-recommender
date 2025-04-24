# AI-Powered Job Recommendation Web App

A full-stack web application that provides personalized job recommendations based on user preferences, built with **FastAPI**, **React**, **Tailwind CSS**, and **SQLite**. Users can register, log in, select interests (e.g., AI & Data Science, Programming), and receive tailored job suggestions using a TF-IDF-based recommendation system.

![Project Screenshot: Preferences Page](screenshots/preferences.png)

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Screenshots](#screenshots)
- [Development Journey](#development-journey)
- [Challenges and Solutions](#challenges-and-solutions)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)

## Features
- **User Authentication**: Register and log in to access personalized recommendations.
- **Preference Selection**: Choose interests like AI & Data Science, Programming, or Web Development.
- **Job Recommendations**: Get tailored job suggestions (up to 10) based on preferences, using TF-IDF and cosine similarity.
- **Responsive UI**: Modern, user-friendly design with Tailwind CSS.
- **Dynamic Recommendations**: Scales the number of suggestions based on selected preferences.
- **Error Handling**: Robust handling for invalid inputs and API errors.

## Tech Stack
- **Front-End**: React, Tailwind CSS, React Router, Axios
- **Back-End**: FastAPI, Python
- **Recommendation System**: Scikit-learn (TF-IDF, cosine similarity), Pandas
- **Database**: SQLite (user data)
- **Dataset**: `jobs.csv` (10 job listings with skills, salary, etc.)
- **Tools**: VS Code, Git

## Project Structure

```
ai-content-recommender/
├── backend/                    # FastAPI back-end
│   ├── main.py                 # API routes (register, login, preferences, recommendations)
│   ├── database.py             # SQLite database setup with SQLAlchemy
│   ├── models.py               # SQLAlchemy models (User)
│   └── venv/                   # Python virtual environment
├── frontend/                   # React front-end
│   ├── src/
│   │   ├── Login.js            # Login page
│   │   ├── Register.js         # Registration page
│   │   ├── Preferences.js      # Preferences selection page
│   │   ├── Recommendations.js  # Job recommendations page
│   │   ├── index.css           # Tailwind CSS styles
│   │   └── App.js              # Main app with routing
│   └── package.json
├── model/                      # Recommendation model and dataset
│   ├── jobs.csv                # Dataset of 10 jobs
│   ├── load_data.py            # Script to preprocess dataset and generate initial model
│   ├── recommender.py          # TF-IDF recommendation logic
│   └── job_recommender_model.pkl  # Trained model
└── README.md
```


## Setup Instructions
1. **Clone the Repository**:
    ```bash
    git clone https://github.com/vijaydoba/ai-content-recommender.git
    cd ai-content-recommender

2. **Set Up the Back-End**:
```
    cd backend
    python3 -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    pip install fastapi uvicorn sqlalchemy pandas scikit-learn joblib
    uvicorn main:app --reload
```    

3. **Set Up the Front-End**:
```
    cd ../frontend
    npm install
    npm start
```
4. **Prepare the Dataset and Model**:
    Ensure `jobs.csv` is in the `model/` directory.
    Run `load_data.py` to preprocess the dataset and generate the initial `job_recommender_model.pkl`:    
```
    cd model
    python load_data.py
```    