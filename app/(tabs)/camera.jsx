import AsyncStorage from "@react-native-async-storage/async-storage";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import { useRef, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

export default function App() {

  const [permission, requestPermission] = useCameraPermissions();
  const [locationPermission, requestLocationPermission] = Location.useForegroundPermissions();
  const [uri, setUri] = useState(null);
  const ref = useRef(null);

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to use the camera
        </Text>
        <Button title="Grant permission" onPress={requestPermission} />
      </View>
    );
  }

  // capture seulement la photo et la met en preview
  const takePicture = async () => {

    const picture = await ref.current?.takePictureAsync(); 
    // ref.current → instance de la caméra
    // takePictureAsync → méthode de cette instance

    if (!picture?.uri) return;

    setUri(picture.uri); 
    // on stocke seulement l'uri pour la prévisualisation
  };


  const handleSavePhoto = async () => { // sauvegarde photo + métadonnées

     if (!locationPermission?.granted) {
    await requestLocationPermission();
  }

    const location = await Location.getCurrentPositionAsync({});   // récupération GPS

    const photoData = {
      uri: uri,
      lat: location.coords.latitude,
      lon: location.coords.longitude,
      date: new Date().toISOString()
    };

    // futur appel backend / JSON Server
    // photosService.savePhoto(photoData)

    // récupération des photos déjà sauvegardées par l'application
    const existingPhotos = await AsyncStorage.getItem("photos");

      const photos = existingPhotos ? JSON.parse(existingPhotos) : [];

      // ajout de la nouvelle photo
      photos.push(photoData);

      // sauvegarde locale
      await AsyncStorage.setItem("photos", JSON.stringify(photos));

      console.log("photo sauvegardée :", photoData); //stockage dans asyncstorage des metadatas (petit stockage  de l'application) et photos en cache

      setUri(null);
    };

  // annule la photo et revient à la caméra
  const handleRetake = () => {
    setUri(null);
  };

  const renderCamera = () => {
    // view dans cameraView car il agit comme un container visuel
    // tout ce qui est dedans est par dessus et pas à coté
    return (
      <CameraView ref={ref} style={styles.camera}>
        <View style={styles.buttonContainer}>
          <Button title="Take picture" onPress={takePicture} />
        </View>
      </CameraView>
    );
  };

  const renderPicture = (uri) => {  
    // view ici regroupe les elements
    return (
      <View style={styles.container}>  

        {/* prévisualisation photo */}
        <Image source={{ uri }} style={styles.image} />

        {/* actions utilisateur */}
        <View style={styles.actions}>
          <Button title="Save photo" onPress={handleSavePhoto} />
          <Button title="Retake" onPress={handleRetake} />
        </View>

      </View>
    );
  };

  // {} insertion de js dans le jsx
  // ? : opérateur ternaire → if / else
  // si uri existe → preview photo
  // sinon → caméra
  return (
    <View style={styles.container}>
      {uri ? renderPicture(uri) : renderCamera()} 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // tout l'écran
    justifyContent: "center", // centré verticalement
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center", // centré horizontalement
  },
  image: {
    flex: 1,
    resizeMode: "contain", // adapter image sans la couper
  },
  actions: {
    padding: 20, //espace avec le bord du container
    gap: 10 // espace entre elements 
  }
});


