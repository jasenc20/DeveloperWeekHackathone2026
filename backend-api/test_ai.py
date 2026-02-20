# xgboost_recommendation.py

import pandas as pd
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# -------------------------------
# 1. Sample training data
# -------------------------------

df1 = pd.read_csv("/Users/jasenclerisier/Desktop/Project/Developer_Week_Hackathone_2026/backend-api/training_data/athelete_training.csv")
df1["item_category"] = "athlete"

df2 = pd.read_csv("/Users/jasenclerisier/Desktop/Project/Developer_Week_Hackathone_2026/backend-api/training_data/elder.csv")
df2["item_category"] = "elder"

df3 = pd.read_csv("/Users/jasenclerisier/Desktop/Project/Developer_Week_Hackathone_2026/backend-api/training_data/fashion.csv")
df3["item_category"] = "fashion"

data = pd.concat([df1, df2, df3], ignore_index=True)
data.columns = data.columns.str.strip()


# -------------------------------
# 2. Encode categorical features
# -------------------------------
categorical_cols = ["first_name","last_name","gender","color","item_name","favorite_color","location","ispurchased"]
data[categorical_cols] = data[categorical_cols].fillna("Unknown")
X = pd.get_dummies(data.drop(columns=["first_name","last_name","item_name","ispurchased"]), columns=categorical_cols)
y = data["label"]

# -------------------------------
# 3. Train / validation split
# -------------------------------
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

# -------------------------------
# 4. Train XGBoost Classifier
# -------------------------------
model = xgb.XGBClassifier(
    n_estimators=200,
    learning_rate=0.05,
    max_depth=6,
    use_label_encoder=False,
    eval_metric="logloss"
)

model.fit(X_train, y_train)

# -------------------------------
# 5. Validate model
# -------------------------------
y_pred = model.predict(X_val)
accuracy = accuracy_score(y_val, y_pred)
print(f"Validation Accuracy: {accuracy:.2f}")

# -------------------------------
# 6. Generate recommendations for a new user
# -------------------------------
# Example new user
user = {"first_name": "Samantha", 
        "last_name": "Jones",
        "age": 32,
        "gender": "pink",
        "color": "Puce",
        "item_name": "sktecher_slip_in_go_run_max_cushioning_purple",
        "favorite_color": "Aquamarine",
        "location": "Ukraine",
        "ispurchased": "false",
        "time_spent_looking": 6,
        "price": "$791.23",
        }

# Candidate items
items = pd.DataFrame([
    {"item_category": "athlete"},
    {"item_category": "elder"},
    {"item_category": "fashion"},
])

# Combine user + items
candidates = pd.concat([pd.DataFrame([user]*len(items)), items], axis=1)

# One-hot encode categorical features
candidates_encoded = pd.get_dummies(candidates)
# Align columns with training data (fill missing columns with 0)
candidates_encoded = candidates_encoded.reindex(columns=X_train.columns, fill_value=0)

# Predict probability of "liked/clicked"
candidates["score"] = model.predict_proba(candidates_encoded)[:, 1]

# Sort by score descending
recommendations = candidates.sort_values("score", ascending=False)
print("\nTop Recommendations for the user:")
print(recommendations)


