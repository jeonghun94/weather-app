import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.firstView} />
      <View style={styles.secondView} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  firstView:{
    flex:1,
    backgroundColor:"red"
  },
  secondView:{
    flex:1,
    backgroundColor:"blue"
  }
});
