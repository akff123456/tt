
from flask import Flask, jsonify, request
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

# Примерные реальные темы (обновляются вручную)
future_trends = ["#AI", "#Euro2025", "#ClimateChange", "#SpaceX", "#Kazakhstan", "#Crypto"]

@app.route("/api/predict", methods=["POST"])
def predict():
    data = request.json
    hashtag = data.get("hashtag", "#unknown").strip()

    percent = random.randint(-10, 40)
    days = random.randint(1, 5)
    confidence = random.randint(65, 95)

    message = f"Тренд {hashtag}: прогнозируется изменение популярности на {percent}% в течение {days} дней. Уверенность: {confidence}%."

    return jsonify({
        "hashtag": hashtag,
        "percent": percent,
        "days": days,
        "confidence": confidence,
        "message": message
    })

@app.route("/api/suggested", methods=["GET"])
def suggested():
    return jsonify({
        "trends": random.sample(future_trends, 3)
    })

if __name__ == "__main__":
    app.run(debug=True)
