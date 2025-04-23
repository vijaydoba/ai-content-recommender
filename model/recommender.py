import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import joblib
import os

def train_model():
    # Ensure the file exists
    file_path = os.path.join("jobs.csv")
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"{file_path} not found. Ensure 'jobs.csv' is in the 'model/' directory.")

    # Load the job dataset
    df = pd.read_csv(file_path)

    # Check for required columns
    required_columns = ["Job ID", "Job Title", "Company", "Location", "Description", "Skills", "Salary", "URL"]
    missing_columns = [col for col in required_columns if col not in df.columns]
    if missing_columns:
        raise ValueError(f"Missing required columns: {', '.join(missing_columns)}")

    # Combine Description and Skills for TF-IDF
    df["text"] = df["Description"].fillna("") + " " + df["Skills"].fillna("")

    # Initialize TfidfVectorizer
    tfidf = TfidfVectorizer(stop_words="english")

    # Create TF-IDF matrix
    tfidf_matrix = tfidf.fit_transform(df["text"])

    # Calculate cosine similarity
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

    # Save model to model/ directory
    model_path = os.path.join("job_recommender_model.pkl")
    joblib.dump((tfidf, cosine_sim, df, tfidf_matrix), model_path)
    print(f"Model saved to {model_path}")

def recommend(preferences, top_n=5):
    try:
        # Load model
        model_path = os.path.join("job_recommender_model.pkl")
        tfidf, cosine_sim, df, tfidf_matrix = joblib.load(model_path)

        # Dynamically adjust top_n based on number of preferences
        num_preferences = len(preferences)
        dynamic_top_n = min(max(top_n, num_preferences * 3), len(df))  # 3 per preference, capped at dataset size

        # Transform user preferences into TF-IDF vector
        user_tfidf = tfidf.transform([" ".join(preferences)])

        # Calculate similarity scores
        sim_scores = cosine_similarity(user_tfidf, tfidf_matrix).flatten()

        # Get top N job indices
        top_indices = sim_scores.argsort()[-dynamic_top_n:][::-1]

        # Return recommended jobs with correct column names
        return df.iloc[top_indices][["Job ID", "Job Title", "Company", "Location", "Salary", "URL"]].to_dict(orient="records")
    except FileNotFoundError:
        raise FileNotFoundError(f"Model file {model_path} not found. Run `train_model()` to create it.")

if __name__ == "__main__":
    try:
        train_model()
        recommendations = recommend(["Programming", "Web Development"])
        print("Recommendations:", recommendations)
    except Exception as e:
        print(f"Error: {e}")