import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import joblib

def train_model():
    # Load the dataset
    df = pd.read_csv("data/articles.csv")
    
    # Initialize the TfidfVectorizer
    tfidf = TfidfVectorizer(stop_words="english")
    
    # Create the TF-IDF matrix from the descriptions
    tfidf_matrix = tfidf.fit_transform(df["description"].fillna(""))
    
    # Calculate cosine similarity between all articles
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
    
    # Save the model, including the vectorizer, cosine similarities, and dataframe
    joblib.dump((tfidf, cosine_sim, df, tfidf_matrix), "recommender_model.pkl")

def recommend(preferences, top_n=5):
    # Load the model
    tfidf, cosine_sim, df, tfidf_matrix = joblib.load("recommender_model.pkl")
    
    # Transform the user preferences into a TF-IDF vector
    user_tfidf = tfidf.transform([" ".join(preferences)])
    
    # Calculate the cosine similarity between user preferences and the dataset
    sim_scores = cosine_similarity(user_tfidf, tfidf_matrix).flatten()
    
    # Get the top N most similar articles
    top_indices = sim_scores.argsort()[-top_n:][::-1]
    
    # Return the recommended articles
    return df.iloc[top_indices][["id", "title", "category", "url"]].to_dict(orient="records")

if __name__ == "__main__":
    # Train the model (you should run this once to create the model)
    train_model()
    
    # Example recommendation with user preferences
    print(recommend(["AI", "Python"]))
