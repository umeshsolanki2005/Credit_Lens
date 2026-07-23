# CreditLens ...

CreditLens is an alternative credit scoring platform designed to empower thin-file borrowers in India. By analyzing alternative data points like UPI transaction history and telecommunications data, CreditLens generates an ML-based credit score and connects borrowers directly with potential lenders.

## Project Structure

This project is divided into two main components:

- **Frontend**: A modern, responsive web application built with Next.js, React, and TailwindCSS. It provides dedicated portals for both Borrowers and Lenders.
- **Backend**: A robust REST API built with FastAPI, SQLAlchemy, and Python. It handles authentication, data processing, machine learning (SHAP tree explainers), and loan application routing.

## Getting Started

To run the full stack locally, you need to set up both the frontend and the backend.

### 1. Backend Setup
Navigate to the `backend/` directory, activate the virtual environment, and run the FastAPI server:
```bash
cd backend
.\venv\Scripts\activate
uvicorn main:app --reload
```
The backend will run on `http://127.0.0.1:8000`. For more details, see the [Backend README](./backend/README.md).

### 2. Frontend Setup
Navigate to the `frontend/` directory, install dependencies, and start the Next.js development server:
```bash
cd frontend
npm install
npm run dev
```
The frontend will run on `http://localhost:3000`. For more details, see the [Frontend README](./frontend/README.md).

## Features

- **Alternative Credit Scoring**: Uses XGBoost and SHAP to analyze non-traditional financial data.
- **Role-Based Portals**: Distinct dashboards for Borrowers (to apply for loans and view scores) and Lenders (to evaluate applicants).
- **Loan Broadcasting**: Borrowers can simulate loans and broadcast their applications to multiple lenders simultaneously.
- **Explainable AI**: Provides transparency by explaining the "Helping" and "Hurting" factors behind every credit score.
