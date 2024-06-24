import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import MainScreen from "../screens/MainScreen";
import BusShelterDetection from "../screens/BusShelterDetection";
import DoorwayDetection from "../screens/DoorwayDetection";
import InterSectionCrossing from "../screens/InterSectionCrossing"
import BottomNavigator from '../screens/BottomNavigator';
import AboutScreen from '../screens/AboutScreen';
import SupportScreen from '../screens/SupportScreen';
import SignOutScreen from '../screens/SignOutScreen';
import DrawerNavigator from '../screens/DrawerNavigator';
import ChildScreen from '../screens/ChildScreen';
import ParentScreen from '../screens/ParentScreen';
import ParentChildRelation from '../screens/ParentChildRelation';
import Terms_PrivacyScreen from '../screens/Terms_PrivacyScreen';
import CashCounter from '../screens/CashCounter';
import CameraScreen from '../screens/CameraScreen';
const Stack = createNativeStackNavigator();
const navigation = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Main" component={MainScreen}/>
        <Stack.Screen name="BusShelter" component ={BusShelterDetection}/>
        <Stack.Screen name="Doorway" component={DoorwayDetection}/>
        <Stack.Screen name="InterSection" component={InterSectionCrossing}/>
        <Stack.Screen name="BottomNavigator" component={BottomNavigator}/>
        <Stack.Screen name="About" component={AboutScreen}/>
        <Stack.Screen name="Support" component={SupportScreen}/>
        <Stack.Screen name="Term_Privacy" component={Terms_PrivacyScreen}/>
        <Stack.Screen name="SignOutScreen" component={SignOutScreen}/>
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator}/>
        <Stack.Screen name="ChildScreen" component={ChildScreen}/>
        <Stack.Screen name="ParentScreen" component={ParentScreen}/>
        <Stack.Screen name="ParentChildRelation" component={ParentChildRelation}/>
        <Stack.Screen name="CashCounter" component={CashCounter}/>
        <Stack.Screen name="CameraScreen" component={CameraScreen}/>
        </Stack.Navigator>
    </NavigationContainer>

  );
};

export default navigation;