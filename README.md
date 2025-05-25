# 💓 Heart Failure Predictor

**Heart Failure Readmission Predictor**

This project is a machine learning-powered web application designed to predict the likelihood of **30-day hospital readmission** for heart failure patients. Built for a healthcare-focused hackathon (Use Case 4), it enables clinicians to identify high-risk patients early and make informed care decisions.

---

## 🚀 Features

- 🔍 Predicts 30-day readmission risk using clinical and lab data
- 🎨 Clean, responsive UI with modern design
- 🧾 Medical form with validation and dynamic lab test input
- ⚡ Real-time prediction via Flask API
- 📊 Visual patient report with risk percentage & printable summary
- 🔐 Google or Email-based Sign-Up/Sign-In via Supabase

---

## 🧠 ML Model

- **Model Type**: XGBoost Classifier
- **Tuning**: Hyperparameter optimization with Optuna
- **Inputs**:
  - Discharge location
  - Gender
  - Length of stay
  - Abnormal lab count
  - Lab test count
  - ICD9-based severity
- **Backend**: Flask API hosted on Render
- **Frontend**: Built using React.js (Next.js) and Tailwind CSS
- **Integration**: CORS-enabled for seamless frontend-backend communication

---

## 📁 Project Folder Structure

````plaintext
heart-failure-prediction/
│
├── frontend/                  # Next.js application
│   ├── components/            # Reusable UI components
│   ├── pages/                 # Application routes
│   │   ├── index.tsx          # Landing page
│   │   ├── signin.tsx         # Sign In page
│   │   ├── signup.tsx         # Sign Up page
│   │   └── dashboard.tsx      # Protected dashboard
│   ├── utils/                 # Helper functions (session, auth)
│   ├── styles/                # Tailwind + global styles
│   └── public/                # Static assets
│
├── backend/                   # Flask API
│   ├── app.py                 # Main Flask app
│   ├── model/
│   │   ├── predict.py         # Prediction logic
│   │   └── train_model.py     # Model training (with Optuna tuning)
│   ├── requirements.txt       # Python dependencies
│   ├── model.pkl              # Serialized ML model (Joblib)
│   └── utils/                 # Data preprocessing, validation
│
├── .env                       # Shared environment config (sample)


## 🧪 How It Works

1. User signs up or signs in via email or Google.
2. Fills in medical form with clinical details.
3. Submits form → data sent to `/predict` API endpoint.
4. Receives a risk score (0–100%) and a diagnosis report.
5. Can print or download the generated report.


## 🛠 Tech Stack

**Frontend**: Next.js, TailwindCSS, motion.dev
**Backend**: Flask, Python
**ML**: XGBoost, Optuna, NumPy, Joblib
**Auth**: Supabase (Email + Google)

## 🌐 Deployment

**Backend**: Flask API hosted on [Render] (https://heart-failure-predictor-brown.vercel.app/)
**Frontend**: Next.js, deployable on [Vercel] (https://heart-failure-predictor-z0j1.onrender.com/predict)

## 🤝 Team

**Team Codiologist**
Built for **Hackathon 2025 – Use Case 4**: 30-Day Readmission Prediction for Heart Failure Patients


## figma file

Figma Link -> https://www.figma.com/design/LQXSo9dh27iJVGmhIfcltt/Landing-page?node-id=0-1&t=diKrBpvhCiMr9QoQ-1


## video explaination

Drive Link - https://drive.google.com/file/d/1CLqVrzb2xeWla4cS2JcT6XDaslOB2NZs/view?usp=sharing

## 🛠️ Installation & Setup Guide

1. clone the repo

 ```sh
   git clone https://github.com/your-username/heart-failure-prediction.git
   cd heart-failure-prediction
```

2. 🧩 Backend Setup (Flask API + XGBoost)

```sh
cd backend
python -m venv venv
source venv/bin/activate       # For Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py  #run the flask api
```

3. 🎨 Frontend Setup (Next.js)
```sh
cd ../frontend
npm install
```

4. setup environment variable for frontend
```sh
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

5. Start the development server:
```sh
npm run dev
```
6. Access the application at http://localhost:3000.
````

## License

This project is licensed under the **MIT License**.
