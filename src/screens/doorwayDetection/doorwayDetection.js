import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Platform, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import * as ort from 'onnxruntime-react-native';
import RNFS from 'react-native-fs';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

async function loadModel() {
  let modelPath;
  if (Platform.OS === 'android') {
    modelPath = 'file:///android_asset/yolov8s.onnx';
  } else if (Platform.OS === 'ios') {
    modelPath = `${RNFS.MainBundlePath}/yolov8s.onnx`;
  }

  const fileExists = await RNFS.exists(modelPath);
  console.log(`File exists: ${fileExists}, Path: ${modelPath}`);

  if (!fileExists) {
    throw new Error(`Model file does not exist at path: ${modelPath}`);
  }

  try {
    const session = await ort.InferenceSession.create(modelPath);
    return session;
  } catch (error) {
    console.error('Model loading error:', error);
    throw error;
  }
}

const DoorwayDetection = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const device = useCameraDevice('back');
  const [detections, setDetections] = useState([]);
  const cameraRef = useRef(null);

  useEffect(() => {
    const requestCameraPermission = async () => {
      const status = await request(
        Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA
      );
      setHasPermission(status === RESULTS.GRANTED);
    };

    requestCameraPermission();
  }, []);

  useEffect(() => {
    const getCameraDevice = async () => {
      const device = await Camera.getAvailableCameraDevices();
      setDevice(device);
    };

    if (hasPermission) {
      getCameraDevice();
    }
  }, [hasPermission]);

  const takePhoto = async () => {
    if (cameraRef.current && device) {
      try {
        const photo = await cameraRef.current.takePhoto();
        loadModel(photo.path);
      } catch (error) {
        console.error('Failed to capture photo:', error);
      }
    }
  };

  if (hasPermission === null) {
    return <View style={styles.centered}><ActivityIndicator size="large" /><Text>Requesting camera permission...</Text></View>;
  }

  if (!device) {
    return <View style={styles.centered}><Text>Camera Device Not Found</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />
      <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
        <View style={styles.innerCircle} />
      </TouchableOpacity>
      <ScrollView style={styles.resultsContainer}>
        {detections.map((item, index) => (
          <Text key={index} style={styles.detectionText}>
            {`${item.name} detected with ${Math.round(item.confidence * 100)}% confidence.`}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  absoluteFill: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 60,
    height: 60,
    backgroundColor: '#f00', // Red for visibility, change as needed
    borderRadius: 30,
  },
  resultsContainer: {
    position: 'absolute',
    bottom: 130,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 10,
    borderRadius: 10,
  },
  detectionText: {
    fontSize: 16,
    marginVertical: 5,
  }
});

export default DoorwayDetection;
