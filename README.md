# AI-Powered Custom Ad Recommendation System
## Overview

This project is a custom advertisement system built directly into a web platform.
It leverages AI-generated descriptions and machine learning–based category matching to deliver personalized ad recommendations based on user profile setup.

Unlike traditional third-party ad networks, this system operates entirely within the website ecosystem and tailors recommendations using structured profile data and intelligent category classification.

## Tech Stack

- FastAPI – Backend API framework
- PostgreSQL – Primary relational database
- Redis – Speed Data pull of Profile information
- XGBoost – Machine learning model for category classification
- AI-powered description generation for shoe


# Installation

## Clone Respository
git clone https://github.com/yourusername/your-repo.git
cd your-repo

## Create Virtual Environment 
python -m venv venv
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows

## Install Dependancy
pip install -r requirements.txt

## Create Redis Tables

## Create Postgres Tables


## Run Server
uvicorn main:app --reload

