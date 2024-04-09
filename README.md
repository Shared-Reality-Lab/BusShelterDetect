# Capstone: Bus Shelter Detection

> supporting models: [`YOLOv8`](https://github.com/ultralytics/ultralytics), [`YOLOv5`](https://github.com/ultralytics/yolov5)

![platform-ios](https://img.shields.io/badge/platform-ios-violet.svg)
![](https://img.shields.io/badge/CoreML-8A2BE2)

![90bda6d59f4d48358378c4ef8db0174e](https://github.com/Shared-Reality-Lab/BusShelterDetect/assets/68878155/a185c55f-fca1-469d-ac86-7cc36b71c367)


Full demo on YouTube: https://youtube.com/shorts/tjjbdm7UCZ8

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



## How To extract frames(images) from video
Please use the following code to extract frames from any captured videos. These frames can be used to train your Yolo based model.

https://drive.google.com/file/d/1VLfaBPzCcC_ms6TR9MjSvHZM_m6GVuOw/view?usp=sharing
