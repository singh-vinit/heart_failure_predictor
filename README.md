# Heart Failure Predictor

**Heart Failure Readmission Predictor**

This project is a machine learning-powered web application designed to predict the likelihood of **30-day hospital readmission** for heart failure patients, it enables clinicians to identify high-risk patients early and make informed care decisions.

### Team - Codiologist

## Demo

- Project Link : https://heart-failure-predictor-brown.vercel.app/
- Video Explanation : https://drive.google.com/file/d/1CLqVrzb2xeWla4cS2JcT6XDaslOB2NZs/view?usp=sharing
- Figma File : https://www.figma.com/design/LQXSo9dh27iJVGmhIfcltt/Landing-page?node-id=0-1&t=diKrBpvhCiMr9QoQ-1
- API Documentation : https://documenter.getpostman.com/view/45294944/2sB2qcCg7z
- ML Model Documentation : https://drive.google.com/file/d/1kImpe-VHfxwSqQu7t3olVJf9ODkin7-F/view?usp=sharing

## Features

- Predicts 30-day readmission risk using clinical and lab data
- Clean, responsive UI with modern design
- Medical form with validation and dynamic lab test input
- Real-time prediction via Flask API
- Visual patient report with risk percentage & printable summary
- Google or Email-based Sign-Up/Sign-In via Supabase

## ML Model

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

## How It Works

1. User signs up or signs in via email or Google.
2. Fills in medical form with clinical details.
3. Submits form → data sent to `/predict` API endpoint.
4. Receives a risk score (0–100%) and a diagnosis report.
5. Can print or download the generated report.

## Authentication (Supabase)

This project uses Supabase Auth for secure authentication with Email/Password and Google OAuth providers.
| **Method** | **Route** | **Description** |
| ---------- | -------------- | ---------------------------------------- |
| `POST` | `/signup` | Register a new user with email/password |
| `POST` | `/signin` | Login user with email and password |
| `POST` | `/auth/callback` | Sign in user with Google OAuth |

## Database Schema: patientDetail

| **Column**          | **Type**    | **Description**                                      |
| ------------------- | ----------- | ---------------------------------------------------- |
| `id`                | `UUID`      | Primary key for the patient record                   |
| `userId`            | `UUID`      | Supabase Auth user ID (foreign key reference)        |
| `patientId`         | `TEXT`      | Custom patient identifier (e.g., `PAT1654`)          |
| `name`              | `TEXT`      | Full name of the patient                             |
| `age`               | `INTEGER`   | Age of the patient                                   |
| `gender`            | `TEXT`      | Gender of the patient (`Male`, `Female`, etc.)       |
| `admitDate`         | `DATE`      | Date when the patient was admitted                   |
| `dischargeDate`     | `DATE`      | Date when the patient was discharged                 |
| `dischargeLocation` | `TEXT`      | Discharge destination (e.g., `HOSPICE-HOME`)         |
| `labTests`          | `JSONB`     | List of lab test results (status and ICD-9 code)     |
| `probability`       | `FLOAT`     | Model-predicted probability (e.g., readmission risk) |
| `created_at`        | `TIMESTAMP` | Timestamp when the record was created                |

## Backend API Route – Store Patient Data

| **Method** | **Route**    | **Description**                       |
| ---------- | ------------ | ------------------------------------- |
| `POST`     | `/api/store` | Create and store a new patient record |

## Tech Stack

| Layer                | Technologies                                                                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Frontend**         | [Next.js](https://nextjs.org/), [TailwindCSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)                         |
| **Backend**          | [Flask](https://flask.palletsprojects.com/), [Python](https://www.python.org/)                                                                   |
| **Machine Learning** | [XGBoost](https://xgboost.readthedocs.io/), [Optuna](https://optuna.org/), [NumPy](https://numpy.org/), [Joblib](https://joblib.readthedocs.io/) |
| **Authentication**   | [Supabase Auth](https://supabase.com/docs/guides/auth) (Email & Google OAuth)                                                                    |

## Deployment

-**Backend**: Flask API hosted on [Render] (https://heart-failure-predictor-z0j1.onrender.com/predict) -**Frontend**: Next.js, deployable on [Vercel] (https://heart-failure-predictor-brown.vercel.app/)

## Installation & Setup Guide

1. clone the repo

```sh
  git clone https://github.com/your-username/heart-failure-prediction.git
  cd heart-failure-prediction
```

2. Backend Setup (Flask API + XGBoost)

```sh
cd backend
python -m venv venv
source venv/bin/activate       # For Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py  #run the flask api
```

3. Frontend Setup (Next.js)

```sh
cd ../frontend
npm install
```

4. setup environment variable for frontend

```sh
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Start the development server:

```sh
npm run dev
```

6. Access the application at http://localhost:3000.

## License

This project is licensed under the **MIT License**.
