# Heart Failure Predictor
Heart Failure Readmission Predictor

This project is a machine learning-powered web application designed to predict the likelihood of 30-day hospital readmission for heart failure patients. Built for a healthcare-focused hackathon (Use Case 4), it enables clinicians to identify high-risk patients early and make informed care decisions.

🚀 Features

Predicts 30-day readmission risk using clinical and lab data

Clean, responsive UI with modern design

Medical information form with validation and dynamic lab test entry

Real-time prediction using a deployed Flask API

Visual patient report with risk percentage and printable summary

Google or Email-based Sign-Up/Sign-In

🧠 ML Model

Model Type: XGBoost Classifier

Tuning: Hyperparameter optimization with Optuna

Inputs: Discharge location, gender, length of stay, abnormal lab count, lab test count, ICD9-based severity

Backend: Flask API served on Render

Frontend: Built using React.js with Tailwind CSS

Integration: CORS enabled for seamless frontend-backend communication

📁 Folder Structure

frontend/          # React-based frontend UI
└── src/
    └── components/  # Hero, Form, Navbar, Report, etc.
backend/           # Flask API for prediction
└── app.py         # Main Flask application
└── xgb_model.pkl  # Trained ML model

🧪 How It Works

User registers and signs in

Fills medical form with details like gender, age, dates, lab tests

Submits data to /predict API endpoint

Receives a risk score (0–100%) and a diagnosis report

Optionally downloads/prints the report

🌐 Deployment

Backend: Flask API hosted on Render

Frontend: React app (Vercel/Netlify compatible)

📦 Tech Stack

Python, Flask, XGBoost

React.js, Tailwind CSS

Optuna, NumPy, joblib

🤝 Team

Team CodiologistBuilt for Hackathon 2025 – Use Case 4: 30-Day Readmission Prediction for Heart Failure Patients

📄 License

This project is for educational and hackathon purposes only. Not intended for real-world clinical use without validation.
