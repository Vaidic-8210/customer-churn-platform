from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd
from feature_columns import FEATURE_COLUMNS


app = FastAPI(
    title="Customer Churn Prediction API"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
model = joblib.load("model/churn_model.pkl")
scaler = joblib.load("model/scaler.pkl")


# --------------------------------
# Convert Form Data → Model Input
# --------------------------------
def convert(data):

    row = dict.fromkeys(
        FEATURE_COLUMNS,
        0
    )

    # PERSONAL

    row["gender"] = (
        1
        if data.get("gender")
        == "Male"
        else 0
    )

    row["SeniorCitizen"] = (
        1
        if data.get("senior")
        == "Yes"
        else 0
    )

    row["Partner"] = (
        1
        if data.get("partner")
        == "Yes"
        else 0
    )

    row["Dependents"] = (
        1
        if data.get("dependents")
        == "Yes"
        else 0
    )

    # RELATIONSHIP

    row["tenure"] = int(
        data.get(
            "tenure",
            0
        )
    )

    # SERVICES

    row["PhoneService"] = (
        1
        if data.get(
            "phoneService"
        )
        == "Yes"
        else 0
    )

    internet = data.get(
        "internetService"
    )

    if internet == "Fiber optic":
        row[
            "InternetService_Fiber optic"
        ] = 1

    elif internet == "No":
        row[
            "InternetService_No"
        ] = 1

    row["OnlineSecurity_Yes"] = (
        1
        if data.get(
            "onlineSecurity"
        )
        == "Yes"
        else 0
    )

    row["OnlineBackup_Yes"] = (
        1
        if data.get(
            "onlineBackup"
        )
        == "Yes"
        else 0
    )

    row["DeviceProtection_Yes"] = (
        1
        if data.get(
            "deviceProtection"
        )
        == "Yes"
        else 0
    )

    row["TechSupport_Yes"] = (
        1
        if data.get(
            "techSupport"
        )
        == "Yes"
        else 0
    )

    row["StreamingTV_Yes"] = (
        1
        if data.get(
            "streamingTv"
        )
        == "Yes"
        else 0
    )

    row["StreamingMovies_Yes"] = (
        1
        if data.get(
            "streamingMovies"
        )
        == "Yes"
        else 0
    )

    # BILLING

    row["PaperlessBilling"] = (
        1
        if data.get(
            "paperlessBilling"
        )
        == "Yes"
        else 0
    )

    contract = data.get(
        "contract"
    )

    if contract == "One year":
        row[
            "Contract_One year"
        ] = 1

    elif contract == "Two year":
        row[
            "Contract_Two year"
        ] = 1

    payment = data.get(
        "paymentMethod"
    )

    if payment == "Electronic check":

        row[
            "PaymentMethod_Electronic check"
        ] = 1

    elif payment == "Mailed check":

        row[
            "PaymentMethod_Mailed check"
        ] = 1

    elif payment == "Credit card":

        row[
            "PaymentMethod_Credit card (automatic)"
        ] = 1

    row["MonthlyCharges"] = float(
        data.get(
            "monthlyCharges",
            0
        )
    )

    row["TotalCharges"] = float(
        data.get(
            "totalCharges",
            0
        )
    )

    # EXTRA FEATURES

    row["YearsWithCompany"] = (
        row["tenure"] / 12
    )

    row["AvgChargePerMonth"] = (
        row["MonthlyCharges"]
    )

    return pd.DataFrame(
        [row]
    )


@app.get("/")
def home():

    return {
        "message":
        "Customer Churn ML API Running",

        "model_loaded":
        True
    }


@app.post("/predict")
def predict(data: dict):

    try:

        df = convert(data)

        scaled = (
            scaler.transform(
                df
            )
        )

        prediction = (
            model.predict(
                scaled
            )[0]
        )

        probability = (
            model.predict_proba(
                scaled
            )[0][1]
        )

        probability = round(
            probability * 100,
            2
        )

        if probability >= 70:

            category = (
                "High Risk"
            )

        elif probability >= 40:

            category = (
                "Medium Risk"
            )

        else:

            category = (
                "Low Risk"
            )

        return {

            "success":
            True,

            "customer":
            data.get(
                "customerName",
                "Unknown Customer"
            ),

            "prediction":
            (
                "Likely To Leave"
                if prediction == 1
                else
                "Likely To Stay"
            ),

            "score":
            probability,

            "category":
            category
        }

    except Exception as e:

        print(
            "Prediction Error:",
            e
        )

        return {

            "success":
            False,

            "customer":
            data.get(
                "customerName",
                "Unknown"
            ),

            "prediction":
            "Error",

            "score":
            0,

            "category":
            "Unknown",

            "error":
            str(e)
        }