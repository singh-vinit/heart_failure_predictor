from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the saved model
model = joblib.load(r"veersa\xgb_model_joblib.pkl")

@app.route('/')
def index():
    return "XGBoost Model API is running!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)

        # Ensure 'features' is in the data
        if "features" not in data:
            return jsonify({"error": "Missing 'features' in request"}), 400

        features = data["features"]

        # Convert to 2D array if necessary
        if isinstance(features[0], (int, float)):
            features = [features]  # single sample

        prediction = model.predict(np.array(features)).tolist()

        return jsonify({"prediction": prediction})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
