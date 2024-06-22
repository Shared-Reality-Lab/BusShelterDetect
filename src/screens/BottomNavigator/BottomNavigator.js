import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import BusShelterDetection from '../BusShelterDetection/BusShelterDetection';
import DoorwayDetection from '../DoorwayDetection/DoorwayDetection';
import InterSectionCrossing from '../InterSectionCrossing/InterSectionCrossing';
import CashCounter from "../CashCounter/CashCounter";
import MainScreen from '../MainScreen/MainScreen';
import { View, Text, StyleSheet } from 'react-native';

const Bottom = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Bottom.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'MainScreen') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'BusShelterDetection') {
            iconName = focused ? 'bus' : 'bus-outline';
          } else if (route.name === 'DoorwayDetection') {
            iconName = focused ? 'enter' : 'enter-outline';
          } else if (route.name === 'InterSectionCrossing') {
            iconName = focused ? 'navigate' : 'navigate-outline';
          } else if (route.name == 'CashCounter') {
            iconName = focused ? 'navigate' : 'cash-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
      })}
    >
      <Bottom.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
      <Bottom.Screen name="BusShelterDetection" component={BusShelterDetection} options={{ headerShown: false }} />
      <Bottom.Screen name="DoorwayDetection" component={DoorwayDetection} options={{ headerShown: false }} />
      <Bottom.Screen name="InterSectionCrossing" component={InterSectionCrossing} options={{ headerShown: false }} />
      <Bottom.Screen name="CashCounter" component={CashCounter} options={{headerShown:false}}/>
    </Bottom.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
    height: 90,
  },
  tabLabel: {
    fontSize: 12,
  },
});

export default BottomNavigator;
