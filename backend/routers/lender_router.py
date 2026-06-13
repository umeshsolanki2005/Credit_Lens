from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from auth.oauth2 import (
    get_current_borrower,
    get_current_lender
)

from models.user import User
from models.lender_selection import LenderSelection
from models.score import Score
import joblib
import shap
import pandas as pd

credit_model = joblib.load("ml_models/credit_score_model.pkl")
credit_columns = joblib.load("ml_models/feature_columns.pkl")

def generate_explain_data(db_user):
    input_data = pd.DataFrame([{
        "AMT_INCOME_TOTAL": db_user.income or 180000,
        "AMT_CREDIT": db_user.amt_credit or 450000,
        "AMT_ANNUITY": db_user.amt_annuity or 22500,
        "DAYS_BIRTH": (db_user.age * -365) if db_user.age else -12000,
        "DAYS_EMPLOYED": (db_user.employment_days * -1) if db_user.employment_days else -2000,
        "EXT_SOURCE_2": db_user.ext_source_2 or 0.5,
        "EXT_SOURCE_3": db_user.ext_source_3 or 0.5
    }])

    for col in credit_columns:
        if col not in input_data.columns:
            input_data[col] = 0

    input_data = input_data[credit_columns]
    explainer = shap.TreeExplainer(credit_model)
    shap_values = explainer.shap_values(input_data)[0]
    shap_series = pd.Series(shap_values, index=credit_columns)

    helping = shap_series.nsmallest(3).reset_index().values.tolist()
    hurting = shap_series.nlargest(3).reset_index().values.tolist()

    return {
        "helping": [{"feature": f, "impact": round(float(v), 2)} for f, v in helping],
        "hurting": [{"feature": f, "impact": round(float(v), 2)} for f, v in hurting]
    }

router = APIRouter(
    prefix="/lender",
    tags=["Lender"]
)


@router.post("/select/{lender_id}")
def select_lender(
    lender_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_borrower)
):
    lender = (
    db.query(User)
    .filter(
        User.id == lender_id,
        User.role == "lender"
    )
    .first()
    )

    if not lender:
        raise HTTPException(
            status_code=404,
            detail="Lender not found"
        )
    
    existing = (
    db.query(LenderSelection)
    .filter(
        LenderSelection.borrower_id == current_user["id"],
        LenderSelection.lender_id == lender_id
    )
    .first()
)

    if existing:
        return {
            "message": "Already selected"
        }
    
    selection = LenderSelection(
        borrower_id=current_user["id"],
        lender_id=lender_id
    )

    db.add(selection)
    db.commit()
    return {
        "message": "Lender selected successfully"
    }


def get_risk_tier(score):
    if score > 700:
        return "Green"
    elif score >= 500:
        return "Yellow"
    else:
        return "Red"
    
@router.get("/applicants")
def get_applicants(
    risk: str = None,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_lender)
):
    print("CURRENT USER:", current_user)

    selections = (
        db.query(LenderSelection)
        .filter(
            LenderSelection.lender_id == current_user["id"]
        )
        .all()
    )

    print("SELECTIONS:", selections)

    applicants = []

    for selection in selections:

        borrower = (
            db.query(User)
            .filter(
                User.id == selection.borrower_id
            )
            .first()
        )

        if not borrower:
            continue

        print("BORROWER:", borrower.id)

        latest_score = (
            db.query(Score)
            .filter(
                Score.user_id == borrower.id
            )
            .order_by(Score.timestamp.desc())
            .first()
        )

        print("LATEST SCORE:", latest_score)

        # If borrower has no score, skip them
        if latest_score is None:
            continue

        tier = get_risk_tier(latest_score.score)

        # Apply optional risk filter
        if risk is not None and tier != risk:
            continue

        applicants.append(
            {
                "id": borrower.id,
                "name": borrower.name,
                "email": borrower.email,
                "score": round(float(latest_score.score)),
                "risk_tier": tier,
                "income": borrower.income or 0,
                "employment_days": borrower.employment_days or 0,
                "status": selection.status or "pending"
            }
        )

    return applicants

@router.get("/applicant/{applicant_id}")
def get_applicant(
    applicant_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_lender)
):
    selection = db.query(LenderSelection).filter(
        LenderSelection.lender_id == current_user["id"],
        LenderSelection.borrower_id == applicant_id
    ).first()
    
    if not selection:
        raise HTTPException(status_code=403, detail="Not authorized to view this applicant")
        
    borrower = db.query(User).filter(User.id == applicant_id).first()
    latest_score = db.query(Score).filter(Score.user_id == applicant_id).order_by(Score.timestamp.desc()).first()
    
    return {
        "id": borrower.id,
        "name": borrower.name,
        "email": borrower.email,
        "score": round(float(latest_score.score)),
        "risk_tier": get_risk_tier(latest_score.score) if latest_score else "Yellow",
        "income": f"₹ {borrower.income or 0} / year",
        "employment": f"{borrower.employment_days or 0} days",
        "explainData": generate_explain_data(borrower)
    }

@router.post("/applicant/{applicant_id}/accept")
def accept_applicant(
    applicant_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_lender)
):
    selection = db.query(LenderSelection).filter(
        LenderSelection.lender_id == current_user["id"],
        LenderSelection.borrower_id == applicant_id
    ).first()
    if not selection:
        raise HTTPException(status_code=404, detail="Selection not found")
    selection.status = "accepted"
    db.commit()
    return {"message": "Applicant accepted"}

@router.post("/applicant/{applicant_id}/reject")
def reject_applicant(
    applicant_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_lender)
):
    selection = db.query(LenderSelection).filter(
        LenderSelection.lender_id == current_user["id"],
        LenderSelection.borrower_id == applicant_id
    ).first()
    if not selection:
        raise HTTPException(status_code=404, detail="Selection not found")
    selection.status = "rejected"
    db.commit()
    return {"message": "Applicant rejected"}