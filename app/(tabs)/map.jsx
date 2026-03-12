import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Button, Image, Modal, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { getCurrentLocation } from "../../services/locationservices";
import { getAllPhotos } from "../../services/photoservices";

export default function MapScreen() {
  const [photos, setPhotos] = useState([]);
  const [region, setRegion] = useState(null);
  const [selected, setSelected] = useState(null); // { photo, index }

  const loadData = async () => {
    // Chargement des photos
    const data = await getAllPhotos();
    setPhotos(data);

    // Position GPS actuelle pour centrer la carte
    try {
      const location = await getCurrentLocation();
      setRegion({
        latitude: location.lat,
        longitude: location.lon,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      });
    } catch (e) {
      console.log("GPS non disponible :", e.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region} showsUserLocation>
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
                <Image
                  source={{ uri: selected.photo.uri }}
                  style={styles.preview}
                  resizeMode="cover"
                />
                <View style={styles.meta}>
                  <Text style={styles.metaText}>
                    📅 {new Date(selected.photo.date).toLocaleString()}
                  </Text>
                  <Text style={styles.metaText}>
                    📍 {selected.photo.lat.toFixed(5)}, {selected.photo.lon.toFixed(5)}
                  </Text>
                </View>
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
    height: 200,
    borderRadius: 8,
  },
  meta: {
    gap: 4,
  },
  metaText: {
    fontSize: 14,
    color: "#444",
  },
  actions: {
    gap: 8,
  },
});


/* export default function MapScreen() {
  return <View />;
}  
*/ 
