import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

// Données fictives pour tester l'affichage
const MOCK_PHOTOS = [
  { id: '1', uri: 'https://picsum.photos/200', title: 'Voyage à Paris' },
  { id: '2', uri: 'https://picsum.photos/201', title: 'Plage du Sud' },
];

export default function PhotosScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_PHOTOS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('Detail', { photo: item })}
          >
            <Image source={{ uri: item.uri }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  card: { margin: 10, backgroundColor: '#fff', borderRadius: 10, overflow: 'hidden', elevation: 3 },
  image: { width: '100%', height: 200 },
  title: { padding: 10, fontWeight: 'bold' }
});