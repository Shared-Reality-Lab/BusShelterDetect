import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Platform, ScrollView } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const CameraScreen = () => {
    const device = useCameraDevice('back');
    const cameraRef = useRef(null);
    const [hasPermission, setHasPermission] = useState(false);
    const [detections, setDetections] = useState([]);

    useEffect(() => {
        const requestCameraPermission = async () => {
            const status = await request(
                Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA
            );
            setHasPermission(status === RESULTS.GRANTED);
        };

        requestCameraPermission();
    }, []);

    const takePhoto = async () => {
        if (cameraRef.current && device) {
            try {
                const photo = await cameraRef.current.takePhoto();
                sendToServer(photo.path); 
            } catch (error) {
                console.error('Failed to capture photo:', error);
            }
        }
    };

    const sendToServer = async (uri) => {
        const data = new FormData();
        data.append('file', {
            uri: `file://${uri}`, 
            type: 'image/jpeg',   
            name: 'photo.jpg'
        });
    
        try {
            const response = await fetch('http://10.122.51.178:5001/detect', {
                method: 'POST',
                body: data,
            });
            if (!response.ok) {
                const text = await response.text(); // Fetch the error text from the response
                throw new Error(`Network response was not ok: ${text}`); // Correctly use template literals here
            }
            const result = await response.json();
            setDetections(result); // Save the detection results to state
            console.log(result);
        } catch (error) {
            console.error('Error uploading image:', error);
            alert(`Failed to send image: ${error.message}`); // Correctly use template literals here
        }
    };    

    if (!hasPermission) {
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

export default CameraScreen;
