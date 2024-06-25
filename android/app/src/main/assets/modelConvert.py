import torch
import onnx
from ultralytics import YOLO

# Load the YOLOv8 model, the model will be downloaded if not present
model = YOLO('yolov8s.pt')  # This will automatically download the model if it's not in the current directory

# Create a dummy input tensor of the right shape
dummy_input = torch.randn(1, 3, 640, 640)  # Batch size = 1, Channels = 3 (RGB), Height = 640, Width = 640

# Export the model to ONNX format
torch.onnx.export(model.model, dummy_input, "yolov8s.onnx", export_params=True, opset_version=12, input_names=['input'], output_names=['output'])

print("Model has been successfully exported to yolov8s.onnx")
