from fastapi import FastAPI
import joblib
import pandas as pd
import numpy as np
import shap
from pydantic import BaseModel
app = FastAPI()

credit_model = joblib.load('models/credit_score_model.pkl')
credit_columns = joblib.load('models/feature_columns.pkl')
loan_model = joblib.load('models/loan_eligibility_model.pkl')
loan_columns = joblib.load('models/loan_feature_columns.pkl')

class UserInput(BaseModel):
    amt_income_total: float
    amt_credit: float
    amt_annuity: float
    days_birth: int
    days_employed: int
    ext_source_2: float
    ext_source_3: float

class LoanInput(BaseModel):
    credit_score: float
    loan_amnt: float
    term: int
    annual_inc: float
    dti: float

@app.post('/score')
def get_credit_score(input: UserInput):
    input_data = pd.DataFrame([input.dict()])
# fill missing columns with 0
    for col in credit_columns:
        if col not in input_data.columns:
            input_data[col] = 0
    input_data = input_data[credit_columns]
    score = 900 - (credit_model.predict_proba(input_data)[:, 1][0] * 600)
    return {'credit_score': float(score), 'status': 'ok'}

@app.post('/explain')
def explain_score(input: UserInput):
    input_data = pd.DataFrame([input.dict()])

    for col in credit_columns:
        if col not in input_data.columns:
            input_data[col] = 0

    input_data = input_data[credit_columns]

    explainer = shap.TreeExplainer(credit_model)
    shap_values = explainer.shap_values(input_data)[0]

    shap_series = pd.Series(shap_values, index=credit_columns)

    helping = (
        shap_series.nsmallest(3)
        .reset_index()
        .values.tolist()
    )

    hurting = (
        shap_series.nlargest(3)
        .reset_index()
        .values.tolist()
    )

    return {
        "helping": [
            {"feature": f, "impact": float(v)}
            for f, v in helping
        ],
        "hurting": [
            {"feature": f, "impact": float(v)}
            for f, v in hurting
        ]
    }


@app.post("/eligibility")
def check_eligibility(input: LoanInput):
    input_data = pd.DataFrame([input.dict()])
    for col in loan_columns:
        if col not in input_data.columns:
            input_data[col] = 0
    input_data = input_data[loan_columns]
    prob = float(loan_model.predict_proba(input_data)[:, 1][0])
    eligible = prob < 0.3
    recommended_amount = float(input.loan_amnt) if eligible else float(input.loan_amnt * 0.7)

    return {
        "default_probability": prob,
        "eligible": eligible,
        "recommended_amount": recommended_amount
    }