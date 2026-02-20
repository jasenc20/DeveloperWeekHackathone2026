
# xgboost_recommendation.py

import pandas as pd
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import LabelEncoder
import joblib 
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer



# -----------------------------------------------
# 1. Predicts the category that the profile falls Under
# -----------------------------------------------

# -------------------------------
# 1. Sample training data
# -------------------------------

df1 = pd.read_csv("/Users/jasenclerisier/Desktop/Project/Developer_Week_Hackathone_2026/backend-api/training_data/athelete_training_category.csv")
df1["item_category"] = "athlete"

df2 = pd.read_csv("/Users/jasenclerisier/Desktop/Project/Developer_Week_Hackathone_2026/backend-api/training_data/elder_category.csv")
df2["item_category"] = "elder"

df3 = pd.read_csv("/Users/jasenclerisier/Desktop/Project/Developer_Week_Hackathone_2026/backend-api/training_data/fashion_category.csv")
df3["item_category"] = "fashion"

data = pd.concat([df1, df2, df3], ignore_index=True)
print(data.head)


# Extract sample information

# Feature - Input to the Neural Network
features = ["age", "gender", "color", "location", "price"]
X = data[features]

# Label - What we want to predict
y = data["item_category"]

# Encode String 
categorical_cols = [ "gender",  "color", "location","price"] # String Based Columns
X = pd.get_dummies(X, columns=categorical_cols)

#Encode Label since there is more than one 
le = LabelEncoder()
y = le.fit_transform(y)


# Split Data as Half being a Training Set and Half being Test Sample
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Create Model
model = xgb.XGBClassifier(
    objective="multi:softmax",  # use "binary:logistic" if binary
    num_class=len(le.classes_),  # only for multi-class
    eval_metric="mlogloss"
)

model.fit(X_train, y_train)


#Evaluate Model
y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)


# Test New User
# Example new user
new_user = {
    "age": 32,
    "gender": "Female",
    "color": "pink",
    "location": "Green,United States",
    "price": "$791.23"
}

# Convert to DataFrame
X_new = pd.DataFrame([new_user])

# Encode categorical features
X_new_encoded = pd.get_dummies(X_new)

# Align columns with training data
X_new_encoded = X_new_encoded.reindex(columns=X_train.columns, fill_value=0)

# Predict
y_new_pred = model.predict(X_new_encoded)

# Convert numeric label back to category
predicted_category = le.inverse_transform(y_new_pred)
print("Predicted Item Category:", predicted_category[0])

# Export Machine Learning Model and Info to be able to load it in FastAPI
joblib.dump(model, "xgboost_model.pkl")
joblib.dump(le,"label_encoder.pkl")
joblib.dump(X_train,"X_train_columns.pkl")


