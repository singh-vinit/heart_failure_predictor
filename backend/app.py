
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
from datetime import datetime

app = Flask(__name__)
CORS(app)

model = joblib.load("xgb_model_joblib.pkl")

def normalize_input(value, min_val, max_val):
    return max(0, min(1, (value - min_val) / (max_val - min_val)))

discharge_mapping = {
    'HOME HEALTH CARE': 1,
    'SNF': 2,
    'HOME': 3,
    'REHAB/DISTINCT PART HOSP': 4,
    'LONG TERM CARE HOSPITAL': 5,
    'SHORT TERM HOSPITAL': 6,
    'LEFT AGAINST MEDICAL ADVI': 7,
    'HOSPICE-HOME': 8,
    'DISC-TRAN CANCER/CHLDRN H': 9,
    'OTHER FACILITY': 10
}

icd9_severity_mapping = {
    "4280": 2, "4281": 3, "4289": 1, "39891": 15, "40201": 14, "40211": 5, "40291": 4,
    "40401": 18, "40403": 18, "40411": 17, "40491": 16, "40493": 16,
    "42820": 6, "42821": 7, "42822": 8, "42823": 9, "42830": 6, "42831": 7,
    "42832": 8, "42833": 9, "42840": 10, "42841": 11, "42842": 12, "42843": 13
}

@app.route('/')
def index():
    return "XGBoost Model API is running!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)

        if "features" not in data:
            return jsonify({"error": "Missing 'features' in request"}), 400

        features = data["features"]

        discharge_location_str = features[0].strip().upper()
        admit_time_str = features[1]
        disch_time_str = features[2]
        gender_str = features[3]
        lab_results = features[4]

        if discharge_location_str not in discharge_mapping:
            return jsonify({"error": f"Invalid discharge location: {discharge_location_str}"}), 400
        discharge_location = discharge_mapping[discharge_location_str]

        try:
            admit_time = datetime.strptime(admit_time_str, "%Y-%m-%d")
            disch_time = datetime.strptime(disch_time_str, "%Y-%m-%d")
            length_of_stay_days = (disch_time - admit_time).days
            if length_of_stay_days < 0:
                return jsonify({"error": "Discharge date must be after admission date"}), 400
            length_of_stay_normalized = normalize_input(length_of_stay_days, 0, 24)
        except ValueError:
            return jsonify({"error": "Invalid date format. Use YYYY-MM-DD"}), 400

        gender_str = gender_str.capitalize()
        if gender_str not in ["Male", "Female"]:
            return jsonify({"error": "Gender must be 'Male' or 'Female'"}), 400
        gender = 1 if gender_str == "Male" else 0

        if not isinstance(lab_results, list):
            return jsonify({"error": "Lab results must be a list of [result, icd9] pairs"}), 400

        lab_test_count = len(lab_results)
        lab_test_count_normalized = normalize_input(lab_test_count, 0, 547)

        abnormal_lab_count = 0
        severities = []

        for result in lab_results:
            if len(result) != 2:
                return jsonify({"error": "Each lab result must be a [status, icd9] pair"}), 400
            status, icd9_code = result[0].lower(), result[1]
            if status not in ["abnormal", "normal"]:
                return jsonify({"error": "Lab result must be 'abnormal' or 'normal'"}), 400
            if status == "abnormal":
                abnormal_lab_count += 1
            severities.append(icd9_severity_mapping.get(icd9_code, 2))

        abnormal_lab_count_normalized = normalize_input(abnormal_lab_count, 0, 101)

        severity = max(2, min(15, max(severities)))

        input_vector = [
            discharge_location,
            length_of_stay_normalized,
            gender,
            abnormal_lab_count_normalized,
            lab_test_count_normalized,
            severity
        ]

        prediction = model.predict([input_vector])[0]
        probability = model.predict_proba([input_vector])[0][1]

        return jsonify({
            "prediction": int(prediction),
            "probability": float(probability)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)


