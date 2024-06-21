import React from 'react';
import { View, StyleSheet } from 'react-native';
import BottomNavigator from "../BottomNavigator/BottomNavigator"

const ParentChildRelation = () => {
  return (
    <View style={styles.container}>
      <BottomNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', 
    
  },
  content: {
    flex: 1,
  },
});

export default ParentChildRelation;