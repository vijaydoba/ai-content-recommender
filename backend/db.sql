USE content_app;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS jobs;
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    preferences TEXT
);
CREATE TABLE jobs (
    id INT PRIMARY KEY,
    title VARCHAR(255),
    company VARCHAR(255),
    location VARCHAR(255),
    description TEXT,
    skills TEXT,
    salary VARCHAR(50),
    url VARCHAR(255)
);