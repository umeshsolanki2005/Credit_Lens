# Backend Integration Changelog

This document outlines the recent architectural changes and feature additions made to the backend to support the full frontend-backend integration.

## 1. Database Schema Evolution
- **Updated `User` Model (`models/user.py`)**: Added columns for borrower profiles. 
  - Added `income`, `employment_days`, `age` to store data from the frontend Onboarding step.
  - Added `amt_credit` and `amt_annuity` to store signals extracted from the UPI/Bank Statement CSV uploads.
- **Migration**: Ran a script to execute `ALTER TABLE users ADD COLUMN ...` on the Neon PostgreSQL database.

## 2. Authentication & JWT Updates
- **JWT Payload (`routers/auth_router.py`)**: Included the user's `name` and `email` directly in the JWT payload. This allows the Next.js frontend `layout.tsx` to safely decode the user's basic profile without needing to make a blocking API request on every page load.
- **Bcrypt Downgrade**: Downgraded the `bcrypt` library to `3.2.2` in `requirements.txt`/venv to resolve a critical `AttributeError` caused by `passlib` incompatibilities with `bcrypt >= 4.0`.

## 3. Endpoint Refactoring
- **CORS Setup**: Added `CORSMiddleware` in `main.py` allowing `["*"]` to ensure the frontend can make `OPTIONS` preflight requests without encountering "Network Errors".
- **Profile Endpoint**: Added `PUT /auth/profile` to save the borrower's onboarding data directly to the database.
- **CSV Upload (`POST /upload`)**: Created a new endpoint in `main.py` that accepts a CSV `UploadFile`, parses it using Pandas, and aggregates transaction amounts (e.g., sums up 'Credit' types) to extract the `amt_credit` feature for the ML model.
- **Stateful ML Endpoints (`/score` and `/explain`)**: Removed the `UserInput` dependency from the frontend payload. These endpoints now securely extract the `current_user` ID from the JWT, fetch the user's `income`, `amt_credit`, etc. from the PostgreSQL database, correctly map them to the UPPERCASE features required by the XGBoost models (e.g. `AMT_INCOME_TOTAL`), and run the predictions.
- **Eligibility Endpoint (`POST /eligibility`)**: Refactored the `LoanInput` schema. It now only expects `loan_amnt` and `term` from the frontend, while securely pulling the user's most recent `credit_score` and `annual_inc` directly from the database.
- **Lender Dashboard Data**: Updated `/lender/applicants` to include `income` and `employment_days`. Added a new detail endpoint `/lender/applicant/{applicant_id}` to retrieve comprehensive profiles and simulated SHAP values for the lender view.
