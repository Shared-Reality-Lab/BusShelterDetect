import { View, Text } from 'react-native'
import React from 'react'
import BottomNavigator from "../BottomNavigator"
import DrawerNavigator from '../DrawerNavigator/DrawerNavigator';

const ParentScreen = (navigation) => {
  return (
    <View style={{flex:1}}>
    <DrawerNavigator/>
    </View>
  )
}

export default ParentScreen;