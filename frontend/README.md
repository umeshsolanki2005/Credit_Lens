# CreditLens Frontend

The frontend for CreditLens is a modern, responsive web application designed to provide a premium user experience for both borrowers and lenders. It uses a sleek design system inspired by enterprise aesthetics, featuring custom color palettes and dynamic micro-animations.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **HTTP Client**: Axios

## Setup Instructions

1. **Prerequisites**
   Ensure you have Node.js (v18+) and npm installed on your system.

2. **Install Dependencies**
   Navigate to the `frontend` directory and install the required npm packages:
   ```bash
   npm install
   ```

3. **Run the Development Server**
   Start the Next.js local development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

- **`src/app/`**: Contains all the Next.js pages and layouts, organized by user role:
  - `(auth)/`: Login and registration pages.
  - `borrower/`: The borrower portal (Dashboard, Simulator, Upload, Score, Roadmap, Applications).
  - `lender/`: The lender portal (Dashboard, Applicant Profiles).
- **`src/components/`**: Reusable React components (like the Navbar).
- **`src/context/`**: React Context providers (e.g., `AuthContext.tsx` for global authentication state management).
- **`src/lib/`**: Utility functions and configurations, including the Axios API instance (`api.ts`).

## Styling Guidelines
This project uses a custom design system defined in `tailwind.config.ts` and `globals.css`. 
- **Primary Color**: `#1B2A4A` (Deep Navy)
- **Accent Color**: `#00B4D8` (Vibrant Cyan)
- **Success Color**: `#06D6A0` (Mint Green)
- **Danger Color**: `#EF476F` (Rose Red)
