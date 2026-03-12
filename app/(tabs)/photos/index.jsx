import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { deletePhoto, getAllPhotos } from "../../../services/photoservices";

export default function PhotosScreen() {
  const [photos, setPhotos] = useState([]);
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      const storedPhotos = await getAllPhotos();
      setPhotos(storedPhotos);
    } catch (error) {
      console.log("Erreur chargement photos :", error);
    }
  };

  const handleDeletePhoto = async (uri) => {
    try {
      await deletePhoto(uri);
      await loadPhotos();
    } catch (error) {
      console.log("Erreur suppression photo :", error);
    }
  };

  const sortedPhotos = [...photos].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const filteredPhotos = sortedPhotos.filter((photo) => {
    const dateMatch =
      searchDate === "" || photo.date?.slice(0, 10).includes(searchDate);

    return dateMatch;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Galerie</Text>

      <TextInput
        placeholder="Filtrer par date (YYYY-MM-DD)"
        value={searchDate}
        onChangeText={setSearchDate}
        style={styles.input}
      />

      <FlatList
        data={filteredPhotos}
        keyExtractor={(item, index) => item.uri || index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.uri }} style={styles.image} />

            <View style={styles.info}>
              <Text style={styles.text}>📅 {item.date?.slice(0, 10)}</Text>
              <Text style={styles.text}>📍 Lat : {item.lat}</Text>
              <Text style={styles.text}>📍 Lon : {item.lon}</Text>

              <Button
                title="Supprimer"
                onPress={() => handleDeletePhoto(item.uri)}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Aucune photo enregistrée</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  image: {
    width: 90,
    height: 90,
    marginRight: 12,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
  empty: {
    marginTop: 20,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
