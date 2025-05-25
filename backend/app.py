from flask import Flask, request, jsonify, render_template
import joblib
import numpy as np
from datetime import datetime
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

model = joblib.load("xgb_model_joblib.pkl")

def normalize_input(value, min_val, max_val):
    normalized = (value - min_val) / (max_val - min_val)
    return max(0, min(1, normalized))

form_to_done_discharge_mapping = {
    1: 2,
    2: 3,
    3: 1,
    4: 4,
    5: 5,
    6: 9,
    7: 7,
    8: 6,
    9: 7,
    10: 7
}

icd9_severity_mapping = {
    "4280": 2,
    "4281": 3,
    "4289": 1,
    "39891": 15,
    "40201": 14,
    "40211": 5,
    "40291": 4,
    "40401": 18,
    "40403": 18,
    "40411": 17,
    "40491": 16,
    "40493": 16,
    "42820": 6,
    "42821": 7,
    "42822": 8,
    "42823": 9,
    "42830": 6,
    "42831": 7,
    "42832": 8,
    "42833": 9,
    "42840": 10,
    "42841": 11,
    "42842": 12,
    "42843": 13
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

        discharge_location_form = int(features[0])
        admit_time_str = features[1]
        disch_time_str = features[2]
        gender_str = features[3]
        lab_results = features[4]

        if discharge_location_form not in form_to_done_discharge_mapping:
            return jsonify({"error": "Discharge location must be between 1 and 10"}), 400
        discharge_location = form_to_done_discharge_mapping[discharge_location_form]

        try:
            admit_time = datetime.strptime(admit_time_str, "%Y-%m-%d %H:%M:%S")
            disch_time = datetime.strptime(disch_time_str, "%Y-%m-%d %H:%M:%S")
            length_of_stay_days = (disch_time - admit_time).total_seconds() / (24 * 3600)
            if length_of_stay_days < 0:
                return jsonify({"error": "Departure time cannot be earlier than admission time"}), 400
            length_of_stay_normalized = normalize_input(length_of_stay_days, 0, 24)
        except ValueError:
            return jsonify({"error": "Invalid timestamp format. Use YYYY-MM-DD HH:MM:SS"}), 400

        gender_str = gender_str.capitalize()
        if gender_str not in ["Male", "Female"]:
            return jsonify({"error": "Gender must be 'Male' or 'Female'"}), 400
        gender = 1 if gender_str == "Male" else 0

        if not isinstance(lab_results, list):
            return jsonify({"error": "Lab results must be a list of [result, icd9] pairs"}), 400

        lab_test_count = len(lab_results)
        lab_test_count_normalized = normalize_input(lab_test_count, 0, 547)

        abnormal_lab_count = sum(1 for result in lab_results if result[0].lower() == "abnormal")
        for result in lab_results:
            if result[0].lower() not in ["abnormal", "normal"]:
                return jsonify({"error": "Lab test results must be 'abnormal' or 'normal'"}), 400
        abnormal_lab_count_normalized = normalize_input(abnormal_lab_count, 0, 101)

        severities = [icd9_severity_mapping.get(result[1], 2) for result in lab_results]
        severity = max(severities)
        if not 2 <= severity <= 15:
            severity = max(2, min(15, severity))

        features_for_model = [
            discharge_location,
            length_of_stay_normalized,
            gender,
            abnormal_lab_count_normalized,
            lab_test_count_normalized,
            severity
        ]

        features_for_model = [features_for_model]

        prediction = model.predict(np.array(features_for_model)).tolist()
        probability = model.predict_proba(np.array(features_for_model))[0][1]

        return jsonify({
            "prediction": prediction,
            "probability": float(probability)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
