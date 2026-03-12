import * as Location from 'expo-location';

export async function requestLocationPermission() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === 'granted';
}

export async function getCurrentLocation() {
  const granted = await requestLocationPermission();

  if (!granted) {
    throw new Error('Permission GPS refusée');
  }

  const position = await Location.getCurrentPositionAsync({});

  return {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  };
}