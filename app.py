from flask import Flask, request, jsonify
import torch
from PIL import Image
from io import BytesIO

app = Flask(__name__)

@app.route('/')
def home():
    return "Server is running"

# Load the YOLOv5 model from Ultralytics
model = torch.hub.load('ultralytics/yolov5', 'yolov5x', pretrained=True)

@app.route('/detect', methods=['POST'])
def detect():
    # Check if the part 'file' is present in request
    if 'file' not in request.files:
        return jsonify({'message': 'No file part in the request'}), 400

    file = request.files['file']

    # Check if a file was actually uploaded
    if file.filename == '':
        return jsonify({'message': 'No file selected for uploading'}), 400

    # Ensure the file is of the type image
    if file and allowed_file(file.filename):
        try:
            # Read the image via PIL and convert it to RGB
            image = Image.open(BytesIO(file.read())).convert('RGB')

            # Perform inference
            results = model(image, size=640)
            results_data = results.pandas().xyxy[0].to_dict(orient='records')  # Convert detection results to JSON format

            return jsonify(results_data)
        except Exception as e:
            return jsonify({'message': str(e)}), 500
    else:
        return jsonify({'message': 'Unsupported file type'}), 400

def allowed_file(filename):
    """ Check if the file extension is allowed """
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg', 'bmp'}

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)

