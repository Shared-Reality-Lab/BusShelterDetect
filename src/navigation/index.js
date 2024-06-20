import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import splashScreen from '../screens/splashScreen';
import mainScreen from "../screens/mainScreen";
import busShelterDetection from "../screens/busShelterDetection";
import doorwayDetection from "../screens/doorwayDetection";
import interSectionCrossing from "../screens/interSectionCrossing"
const Stack = createNativeStackNavigator();
const navigation = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash" component={splashScreen} />
        <Stack.Screen name="main" component={mainScreen}/>
        <Stack.Screen name="busShelter" component ={busShelterDetection}/>
        <Stack.Screen name="doorway" component={doorwayDetection}/>
        <Stack.Screen name="interSection" component={interSectionCrossing}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default navigation;