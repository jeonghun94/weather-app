import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Getting Fuckin Weathe!!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"flex-end",
    backgroundColor:"white",
    paddingHorizontal: 40,
    paddingVertical: 100
  },
  text: {
    color:"white",
    fontSize:20
  }
});
