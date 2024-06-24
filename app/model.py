import torch
import cv2
import numpy as np

def load_model():
    model = torch.hub.load('ultralytics/yolov9e', 'yolov9e')  # Replace with actual YOLOv8 loading code
    return model

model = load_model()

def predict(image):
    # Convert image to numpy array
    nparr = np.frombuffer(image, np.uint8)
    img_np = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Run inference
    results = model(img_np)

    # Process results (convert to JSON serializable format)
    processed_results = results.pandas().xyxy[0].to_dict(orient="records")

    return processed_results
