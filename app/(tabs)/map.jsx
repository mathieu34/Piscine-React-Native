import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Button, Image, Modal, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
export default function MapScreen() {
  const [photos, setPhotos] = useState([]);
  const [selected, setSelected] = useState(null); // { photo, index }

  const loadPhotos = async () => {
    const stored = await AsyncStorage.getItem("photos");
    const data = stored ? JSON.parse(stored) : [];
    setPhotos(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadPhotos();
    }, [])
  );

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {photos.map((photo, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: photo.lat, longitude: photo.lon }}
            onPress={() => setSelected({ photo, index })}
          />
        ))}
      </MapView>

      <Modal
        visible={selected !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setSelected(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {selected && (
              <>
                <Image source={{ uri: selected.photo.uri }} style={styles.preview} resizeMode="cover" />
                <Text style={styles.date}>{new Date(selected.photo.date).toLocaleString()}</Text>
                <View style={styles.actions}>
                  <Button title="Voir le détail" disabled />
                  <Button title="Fermer" color="#999" onPress={() => setSelected(null)} />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    gap: 12,
  },
  preview: {
    width: "100%",
    height: 220,
    borderRadius: 8,
  },
  date: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  actions: {
    gap: 8,
  },
});


/* export default function MapScreen() {
  return <View />;
}  */
 
