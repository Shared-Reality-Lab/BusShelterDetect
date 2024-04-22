# Capstone: Bus Shelter Detection
### Vision-guided Navigation Assistance for the Visually Impaired
#### Problem Description:

Our goal is to build an app that can guide a visually impaired user toward a Montreal bus shelter using image recognition and navigation assistance. The application aims to address the problems faced by the visually impaired community surrounding their mobility in modern urban environments. We seek to tackle bus shelter identification in Montreal, in addition to providing accurate navigational guidance, as there exists no current solution that can efficiently and reliably identify these crucial landmarks.


> supporting ML models: [`YOLOv8`](https://github.com/ultralytics/ultralytics), [`YOLOv5`](https://github.com/ultralytics/yolov5)




![platform-ios](https://img.shields.io/badge/platform-ios-violet.svg)
![](https://img.shields.io/badge/CoreML-8A2BE2)

![90bda6d59f4d48358378c4ef8db0174e](https://github.com/Shared-Reality-Lab/BusShelterDetect/assets/68878155/a185c55f-fca1-469d-ac86-7cc36b71c367)


Full demo on YouTube: https://youtube.com/shorts/tjjbdm7UCZ8

## Application Architecture:
<img width="468" alt="Screenshot 2024-04-09 at 10 36 38 AM" src="https://github.com/Shared-Reality-Lab/BusShelterDetect/assets/68878155/5df70a5d-679a-4553-ad5f-0d272495080a">

## Dataset:

Our custom dataset of 5,264 images features various bus shelter types from around Montreal, and can be found here:

https://app.roboflow.com/capstone-so4x3/light_bus_shelter/browse?queryText=&pageSize=50&startingIndex=0&browseQuery=true

Process:
1) Collected videos of bus shelters
2) Extracted frames from the videos (using the splitvideo.ipynb)
3) Set bounding boxes for bus shelters in frame (using website https://www.makesense.ai/)
 

## Requirements

- Xcode 10.3+
- iOS 13.0+

## How To Build and Run the Project

### 1. Clone the project

```shell
git clone https://github.com/tucan9389/ObjectDetection-CoreML
```

### 2. Prepare Core ML model

- You can download a pretrained Yolo model from the official wiki or alternatively you can train your own: [YoloV8 Ultralytics](https://github.com/ultralytics/ultralytics)

  #### Convert Yolo model (.pt) to coreml format:

```shell
yolo export model=yolov8n.pt format=coreml nms
```

### 3. Add the model to the project

By default, the project uses a bus shelter detecting `yolov8s` model. If you want to use another model, you can replace the model file in the project. Please navigate to to the "mlmodel" folder and paste your model.

### 4. Set model name properly in `ViewController.swift`

<img width="640" alt="image" src="https://user-images.githubusercontent.com/37643248/188249496-20ba838c-7f0f-4457-adac-2fa11344c7de.png">

### 5. Build and Run


