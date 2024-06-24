import { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { 
    useCameraPermission,
    useCameraDevice,
    Camera,
} from 'react-native-vision-camera';

const CameraScreen = () => {
    const { hasPermission, requestPermission } = useCameraPermission();
    const device = useCameraDevice('back');

    useEffect(() => {
        if (!hasPermission) {
            requestPermission();
        }
    }, [hasPermission, requestPermission]);

    if (!hasPermission) {
        return <ActivityIndicator />;
    }

    if (!device) {
        return <Text>Camera Device Not Found</Text>;
    }

    return (
        <View style={{ flex: 1 }}>
            <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} style={{ flex: 1 }} />
        </View>
    );
};

export default CameraScreen;
