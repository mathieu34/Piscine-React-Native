import { CameraView, useCameraPermissions } from "expo-camera";

import { useRef, useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import { getCurrentLocation } from "../../services/locationservices";
import { savePhoto } from "../../services/photoservices";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  const [uri, setUri] = useState(null);
  const ref = useRef(null);

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>
          We need your permission to use the camera
        </Text>
        <Button title="Grant permission" onPress={requestPermission} />
      </View>
    );
  }


  const takePicture = async () => {
    try {
      const picture = await ref.current?.takePictureAsync();

      if (!picture?.uri) return;

      setUri(picture.uri);
    } catch (error) {
      console.log("Erreur prise photo :", error);
      Alert.alert("Erreur", "Impossible de prendre la photo");
    }
  };

  const handleSavePhoto = async () => {
    try {
      if (!uri) return;

      const coords = await getCurrentLocation();

      const photoData = {
        uri: uri,
        lat: coords.lat,
        lon: coords.lon,
        date: new Date().toISOString(),
      };

      await savePhoto(photoData);

      console.log("Photo sauvegardée :", photoData);
      Alert.alert("Succès", "Photo sauvegardée avec succès");

      setUri(null);
    } catch (error) {
      console.log("Erreur sauvegarde photo :", error);
      Alert.alert("Erreur", error.message || "Impossible de sauvegarder la photo");
    }
  };


  const handleRetake = () => {
    setUri(null);
  };

  const renderCamera = () => {

    return (
      <CameraView ref={ref} style={styles.camera}>
        <View style={styles.buttonContainer}>
          <Button title="Take picture" onPress={takePicture} />
        </View>
      </CameraView>
    );
  };

  const renderPicture = (photoUri) => {
    return (
      <View style={styles.container}>
        <Image source={{ uri: photoUri }} style={styles.image} />
        <View style={styles.actions}>
          <Button title="Save photo" onPress={handleSavePhoto} />
          <Button title="Retake" onPress={handleRetake} />
        </View>
      </View>
    );
  };


  return (
    <View style={styles.container}>
      {uri ? renderPicture(uri) : renderCamera()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  permissionText: {
    textAlign: "center",
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
  },
  image: {
    flex: 1,
    resizeMode: "contain",
  },
  actions: {
    padding: 20,
    gap: 10,
  },
}
);