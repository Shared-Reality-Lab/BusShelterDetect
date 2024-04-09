# Capstone: Bus Shelter Detection

> supporting models: [`YOLOv8`](https://github.com/ultralytics/ultralytics), [`YOLOv5`](https://github.com/ultralytics/yolov5)

![platform-ios](https://img.shields.io/badge/platform-ios-lightgrey.svg)



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

- You can download COCO models or another model from [here](#model-size-minimum-ios-version-download-link)

> Or if you want to make and use model with custom dataset,
> 1. follow [roboflow tutorial from scratch](https://blog.roboflow.com/how-to-train-yolov5-on-a-custom-dataset/) or [yolov5 repo's tutorial](https://github.com/ultralytics/yolov5/issues/12)
> 2. and convert the `.pt` model to `.mlmodel` model with [our issue](https://github.com/tucan9389/ObjectDetection-CoreML/issues/6#issuecomment-1235192089).

### 3. Add the model to the project

By default, the project uses the `yolov8s` model. If you want to use another model, you can replace the model file in the project. Go to mlmodel folder and paste model.

### 4. Set model name properly in `ViewController.swift`

<img width="640" alt="image" src="https://user-images.githubusercontent.com/37643248/188249496-20ba838c-7f0f-4457-adac-2fa11344c7de.png">

### 5. Build and Run

## How To Run with your own model

### 1. Convert your model to Core ML

> At this moment(23.04.08), there is error when converting yolov8 models to Core ML. Once https://github.com/ultralytics/ultralytics/pull/1791 is merged, you can use the following steps. (Or you can use [this PR](https://github.com/ultralytics/ultralytics/pull/1898) alternatively.)

#### Pre-requirements

```shell
pip install ultralytics
pip install coremltools
```

#### Option 1) With shell

```shell
yolo export model=yolov8n.pt format=coreml nms
```


