# CreditLens Backend

The backend for CreditLens is built using FastAPI and Python. It manages the database interactions, user authentication, machine learning model inference, and the core business logic for loan broadcasting and underwriting.

## Tech Stack
- **Framework**: FastAPI
- **Database**: PostgreSQL (via Neon) & SQLAlchemy ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Machine Learning**: Scikit-Learn, XGBoost, SHAP
- **Data Processing**: Pandas, NumPy

## Setup Instructions

1. **Prerequisites**
   Ensure you have Python 3.10+ installed on your system.

2. **Virtual Environment**
   Activate the existing virtual environment:
   ```bash
   .\venv\Scripts\activate
   ```

3. **Install Dependencies**
   If you need to reinstall packages, use:
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment Variables**
   Create a `.env` file in the root of the `backend` directory containing:
   ```env
   DATABASE_URL="postgresql://<user>:<password>@<host>/<dbname>"
   SECRET_KEY="your_jwt_secret_key"
   ALGORITHM="HS256"
   ```

5. **Run the Server**
   Start the FastAPI development server:
   ```bash
   uvicorn main:app --reload
   ```
   The API will be accessible at `http://127.0.0.1:8000`. You can view the interactive Swagger API documentation at `http://127.0.0.1:8000/docs`.

## Key Components
- **`main.py`**: The entry point for the FastAPI application. Contains the ML inference endpoints (`/score`, `/explain`, `/upload`).
- **`routers/`**: Contains the route definitions for different domains (`auth_router.py`, `borrower_router.py`, `lender_router.py`).
- **`models/`**: SQLAlchemy database models (`user.py`, `score.py`, `lender_selection.py`).
- **`ml_models/`**: Serialized `.pkl` files containing the trained XGBoost model and feature columns.
