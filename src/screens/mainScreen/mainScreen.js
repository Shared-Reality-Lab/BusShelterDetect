import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Ensure you have this dependency installed

const MainScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const handleGetStarted = () => {
    navigation.navigate('CameraScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.centered}>
        <Text style={styles.welcomeText}>Welcome to MainScreen!</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={handleGetStarted}>
            <View style={styles.signIn}>
              <Text style={styles.textSign}>Open Camera</Text>
              <Icon
                name="chevron-forward-sharp"
                color="#fff"
                size={20}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
  },
  button: {
    marginTop: 20,
  },
  signIn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  textSign: {
    color: '#fff',
    marginRight: 5,
    fontSize: 16,
  },
});

export default MainScreen;
