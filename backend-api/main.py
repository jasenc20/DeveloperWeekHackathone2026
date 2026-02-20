from itertools import product
from fastapi import FastAPI, Depends, HTTPException
import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import Column, Integer, String, select,text
import redis.asyncio as redis
from contextlib import asynccontextmanager
from sqlalchemy.engine import URL
import asyncpg
from openai import OpenAI,AsyncOpenAI
from pydantic import BaseModel
import re
import redis.asyncio as redis
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
import joblib 
import pandas as pd


#Cors 
origins = [
    "http://localhost:5173",  # React dev server
    "http://127.0.0.1:5173",
]


#OpenAPI Key



# ========================
# Database Configuration
# ========================

db_config = {
    "drivername": "postgresql+asyncpg",
    "username": "test",
    "password": "password",
    "host": "localhost",
    "port": 5433,
    "database": "postgres"
}

REDIS_URL = os.getenv(
    "1270.0.1:6390",
    "redis://localhost:6379"
)


# ===============================
# Database Setup (PostgreSQL)
# ===============================
database_url = URL.create(**db_config)

engine = create_async_engine(database_url, echo=True)

AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

# ===============================
# Redis Setup
# ===============================

redis_client = redis.Redis(
    host="localhost",
    port=6390,
    db=0,
    decode_responses=True
)

# ===============================
# Lifespan (Modern Startup/Shutdown)
# ===============================

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Starting up...")

    # -------------------------------
    # PostgreSQL: Create asyncpg pool
    # -------------------------------
    app.state.db_pool = await asyncpg.create_pool(
        user=db_config["username"],
        password=db_config["password"],
        database=db_config["database"],
        host=db_config["host"],
        port=db_config["port"],
        min_size=1,
        max_size=10
    )
    print("Connected to Postgres")

    # -------------------------------
    # Redis (optional)
    # -------------------------------
    app.state.redis = redis_client
    await app.state.redis.ping()
    # print("Connected to Redis")

    yield  # Application runs here

    # -------------------------------
    # Shutdown
    # -------------------------------
    print("Shutting down...")
    await app.state.db_pool.close()
    await app.state.redis.close()  # if using Redis

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello FastAPI 🚀"}


class UserProfile(BaseModel):
    email:str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    location:Optional[str] = None
    price:Optional[str] = None



class ProductRequest(BaseModel):
    product_name: str
    age: int
    gender: str
    user_profile: str
    location: str
    item_bought_in_the_past: str
    average_price_of_past_item_bought: int



@app.get("/redis_user_profile")
async def get_redis_user(email: str):

    user_id = await redis_client.get(f"user:email:{email}")

    if not user_id:
        return {"error": "User not found"}
    
    user_info = await redis_client.hgetall(f"user:{user_id}")

    return {
        "response": user_info
    }





@app.put("/update_redis_user")
async def update_redis_user(userInfo: UserProfile):
    user_id = await redis_client.get(f"user:email:{userInfo.email}")

    if not user_id:
        return {"error": "User not found"}
    
    finalDict = {}

    if userInfo.first_name is not None and userInfo.first_name != "string":
        finalDict["first_name"] = userInfo.first_name

    if userInfo.last_name is not None and userInfo.last_name != "string":
        finalDict["last_name"] = userInfo.last_name

    if userInfo.age is not None and userInfo.age != 0:
        finalDict["age"] = userInfo.age

    if userInfo.gender is not None and userInfo.gender != "string":
        finalDict["gender"] = userInfo.gender

    if userInfo.location is not None and userInfo.location != "string":
        finalDict["location"] = userInfo.location
    
    if userInfo.price is not None and userInfo.price != "string":
        finalDict["price"] = userInfo.price
    
    #Update User Info
    await redis_client.hset(f"user:{user_id}", mapping=finalDict)

    return{
        "response": f"Successfully Update {user_id}"
    }


@app.post("/add_redis_user")
async def add_user():
    #Athlete
    await redis_client.hset("user:1",
        mapping={
            "email": "johnkirk@email.com",
            "first_name": "John",
            "last_name": "Kirk",
            "age": 28,
            "gender": "Male",
            "color": "Red",
            "location": "Miami,United States",
            "price": "$791.23"
        }             
        )
    await redis_client.set("user:email:johnkirk@email.com", 1)

    #Elder
    await redis_client.hset("user:2",
        mapping={
            "email": "glendasoutherns@email.com",
            "first_name": "Glenda",
            "last_name": "southerns",
            "age": 62,
            "gender": "Female",
            "color": "Yellow",
            "location": "Seattle,United States",
            "price": "$391.23"
        }             
        )
    
    await redis_client.set("user:email:glendasoutherns@email.com", 2)

    #Fashion
    await redis_client.hset("user:3",
        mapping={
            "email": "samanthashaw@email.com",
            "first_name": "Samantha",
            "last_name": "Shaw",
            "age": 32,
            "gender": "Female",
            "color": "Blue",
            "location": "Boston,United States",
            "price": "$852.17"
        }             
        )
    
    await redis_client.set("user:email:samanthashaw@email.com", 3)

#input: email,password
#return: status_code
@app.get("/login")
def login():
    return {"status": "ok"}

#input: firstnam, lastname, email, password, date_of_birth, favorite_color
#return: status_code
@app.post("/create_account")
def create_account():
    return {"status": "ok"}

#input: user_info
#return: list_of_items
@app.get("/cart_view")
async def cart_view(db: AsyncSession = Depends(get_db)):
    return {"status": "ok"}

#input: user_info, item_id
#return: new_list_after_removal
@app.delete("/remove_item_from_cart")
def remove_item_from_cart():
    return {"status": "ok"}

#input: user_info, item_id
#return: new_list_after_addition
@app.post("/add_item_to_cart")
def add_item_to_cart():
    return {"status": "ok"}

#input: user_info, list_of_ids
#return: status_code
@app.post("/buy_items")
def buy_items():
    return {"status": "ok"}

#input: category_filtering, sex_filtering
#return: list_of_all_possible_items
@app.get("/item_view")
async def item_view():
    query = "SELECT name,price,quantity,available_colors FROM store.inventory"
    async with app.state.db_pool.acquire() as conn:
        rows = await conn.fetch(query)
        inventory = [dict(row) for row in rows]
    return inventory

@app.get("/item_view_filtered")
async def item_view_filtered(category:str):
    query = "SELECT name,price,quantity,available_colors FROM store.inventory WHERE category = $1;"
    async with app.state.db_pool.acquire() as conn:
        rows = await conn.fetch(query, category)
        inventory_filter = [dict(row) for row in rows]
    return inventory_filter


#input: category_filtering, sex_filtering
#return: list_of_all_possible_items
@app.get("/get_adds")
def get_adds_view():
    return {"status": "ok"}



@app.post("/get_new_product_title")
async def get_new_product_title(data: ProductRequest):
    prompt = f"""
    A Small Description for a new product that would entice a user with the profile below to click and buy

    Product Name: {data.product_name}

    User Profile:
    - Age: {data.age}
    - Category Of User Profile: {data.user_profile}
    - Shopping Behavior: {data.item_bought_in_the_past}
    - Location: {data.location}
    - Gender: {data.gender}
    - Average Price Of Past Item Bought: ${data.average_price_of_past_item_bought}


    Tone: Highly persuasive, personalized, modern marketing style.
    Include:
    - Short ad headline 10 characters or less
    - 3 Bullet benefits short 1 word
    """

    response = await client.responses.create(
        model="gpt-4o-mini",
        input=[
            {"role": "system", "content": "You are a professional marketing copywriter."},
            {"role": "user", "content": prompt},
        ],
        temperature=0.8,
    )


    ##Optimize String To get Info
    opResponse = response.output_text.split('\n')
    dictResponse = {}
    print("Optimize Response",opResponse)

    for i in range(len(opResponse)):
        if("Headline" in opResponse[i]):
            if(opResponse[i+1] == ''):
                
                split2 = opResponse[i].split('**')

                split3 = split2[len(split2)-1]
                dictResponse['title'] = re.sub(r'^\s*[-*]+\s*|\s*\*+\s*$', '',  split3).strip()
            else:
                dictResponse['title'] = re.sub(r'^\s*[-*]+\s*|\s*\*+\s*$', '',  opResponse[i+1]).strip()

        if("Benefit" in opResponse[i]):
            dictResponse['benefit'] = []
            for j in range(i+1, i+4):
                text = re.sub(r'^[-*\s]+', '', re.sub(r'^\s*[-*]+\s*|\s*\*+\s*$', '',  opResponse[j]).strip())   # remove ALL leading -, *, spaces
                text = re.sub(r'^[-*\s]+', '', text)   # remove ALL leading -, *, spaces
                dictResponse['benefit'].append(text)


    return {
        "Response": dictResponse
    }


@app.post("/get_profile_category")
async def get_profile_category(profile: UserProfile):
    #Load model
    model = joblib.load("xgboost_model.pkl")
    le = joblib.load("label_encoder.pkl") 
    X_train = joblib.load("X_train_columns.pkl")  # DataFrame 


    # Convert Input to Dict
    profile_dict = profile.model_dump()
    profile_dict.pop("email", None)

    # Convert to DataFrame
    X_new = pd.DataFrame([profile_dict])

    # Encode categorical features
    X_new_encoded = pd.get_dummies(X_new)

    # Align columns with training data
    X_new_aligned = X_new_encoded.reindex(columns=X_train.columns, fill_value=0)

    # Make prediction
    prediction = model.predict(X_new_aligned)
    predict_category = le.inverse_transform(prediction)

    # Optional: log to server console
    return {"predicted_category": predict_category[0]}
