from flask import Blueprint, request, jsonify
from .yolo_model import load_model, predict

main = Blueprint('main', __name__)

@main.route('/predict', methods=['POST'])
def predict_route():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file:
        image = file.read()
        results = predict(image)
        return jsonify(results)
