# Full Frontend-Backend Integration Plan

Currently, the frontend uses `localStorage` for state management, mocks the CSV upload, and uses hardcoded data for the Lender Dashboard. This plan will "connect" everything end-to-end to the PostgreSQL database and FastAPI endpoints.

## User Review Required

> [!IMPORTANT]
> This plan involves modifying your backend database schema (adding profile columns to the User model) and changing the ML endpoint signatures so they read directly from the database rather than from the frontend payload.

## Proposed Changes

### Backend Components

#### [MODIFY] `backend/models/user.py`
- Add columns to store the onboarding data: `income`, `employment_days`, `age`.
- Add columns to store extracted CSV data (e.g. `amt_credit`, `amt_annuity`).

#### [MODIFY] `backend/routers/auth_router.py`
- Add a new `PUT /auth/profile` endpoint for the onboarding step to save Income, Age, and Employment Days to the database for the `current_user`.

#### [MODIFY] `backend/main.py`
- **CSV Upload Endpoint:** Create a `POST /upload` endpoint that uses `UploadFile`. It will use Pandas to parse the uploaded CSV (simulated UPI data), extract a few basic features (like `amt_credit`), and save them to the user's row in the database.
- **Score & Explain Endpoints:** Modify the `/score` and `/explain` endpoints so they **no longer require payload input from the frontend**. They will pull the user's data directly from the PostgreSQL database, run the XGBoost models, and return the result.

#### [MODIFY] `backend/routers/lender_router.py`
- Ensure `/lender/applicants` returns the necessary data (income, age, employment) so the lender dashboard can display the real user's profile instead of mocked data.

---

### Frontend Components

#### [MODIFY] `src/app/borrower/onboarding/page.tsx`
- Remove `localStorage.setItem`.
- Replace with an `api.put('/auth/profile', formData)` call.

#### [MODIFY] `src/app/borrower/upload/page.tsx`
- Remove the `setTimeout` mock upload.
- Replace with an `api.post('/upload', fileData, { headers: { 'Content-Type': 'multipart/form-data' }})` call to send the actual CSV to the backend.

#### [MODIFY] `src/app/borrower/score/page.tsx`
- Remove the code that fetches from `localStorage`.
- Simply call `api.post('/score')` with no body, letting the backend rely on the JWT token to look up the DB profile.

#### [MODIFY] `src/app/lender/dashboard/page.tsx` & `src/app/lender/applicant/[id]/page.tsx`
- Remove the hardcoded `MOCK_APPLICANTS`.
- Fetch the real applicants from the backend `api.get('/lender/applicants')`.
- Ensure the detail page calls a backend endpoint to fetch the applicant's specific SHAP values and profile instead of the mock logic.

## Verification Plan
1. Register a new Borrower and go through the Onboarding form.
2. Upload a dummy `.csv` file.
3. Verify the ML Score and SHAP values load successfully from DB data.
4. Log into the Lender account and verify the new applicant appears in the table with real DB data.
