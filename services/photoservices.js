import AsyncStorage from "@react-native-async-storage/async-storage";

const PHOTOS_KEY = "photos";

export async function getAllPhotos() {
  const data = await AsyncStorage.getItem(PHOTOS_KEY);
  return data ? JSON.parse(data) : [];
}

export async function savePhoto(photo) {
  const photos = await getAllPhotos();
  const updatedPhotos = [photo, ...photos];
  await AsyncStorage.setItem(PHOTOS_KEY, JSON.stringify(updatedPhotos));
  return updatedPhotos;
}

export async function getPhotoById(uri) {
  const photos = await getAllPhotos();
  return photos.find((photo) => photo.uri === uri) || null;
}

export async function deletePhoto(uri) {
  const photos = await getAllPhotos();
  const updatedPhotos = photos.filter((photo) => photo.uri !== uri);
  await AsyncStorage.setItem(PHOTOS_KEY, JSON.stringify(updatedPhotos));
  return updatedPhotos;
}

export async function filterPhotos({ date = null } = {}) {
  const photos = await getAllPhotos();

  return photos.filter((photo) => {
    const matchDate = date ? photo.date?.slice(0, 10) === date : true;
    return matchDate;
  });
}