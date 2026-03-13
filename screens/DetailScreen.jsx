import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function DetailScreen({ route }) {
  // On récupère les paramètres "photo" envoyés par la navigation
  const { photo } = route.params || {};

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo?.uri }} style={styles.fullImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{photo?.title || "Pas de titre"}</Text>
        <Text>Coordonnées GPS : 48.85, 2.35</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  fullImage: { width: '100%', height: '70%' },
  infoContainer: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' }
});