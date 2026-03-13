import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// L'export doit être "default" pour correspondre à l'import dans App.js
export default function CameraScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>📸 Écran Caméra</Text>
      <Text>Le flux vidéo s'affichera ici.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Fond noir pour le style caméra
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});