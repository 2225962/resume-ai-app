import os
import joblib
import numpy as np
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# =========================
# LOAD MODEL (AZURE SAFE)
# =========================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model.pkl")

model = joblib.load(MODEL_PATH)

history = []

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        experience = float(data.get("experience", 0))
        skills = len(data.get("skills", "").split(",")) if data.get("skills") else 0
        certs = len(data.get("certifications", "").split(",")) if data.get("certifications") else 0
        projects = float(data.get("projects", 0))

        features = np.array([[experience, skills, certs, projects]])

        prediction = model.predict(features)[0]
        result = "Proceed to Interview" if prediction == 1 else "Reject"

        history.append({
            "experience": experience,
            "skills": skills,
            "certifications": certs,
            "projects": projects,
            "result": result
        })

        return jsonify({"result": result})

    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/history")
def get_history():
    return jsonify(history)


if __name__ == "__main__":
    app.run()
