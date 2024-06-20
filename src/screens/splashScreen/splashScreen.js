import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

const splashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.centered}>
        <Text style={styles.welcomeText}>Welcome to SplashScreen!</Text>
      </View>
    </SafeAreaView>
  );
}

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
});

export default splashScreen;