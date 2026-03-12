import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { getAllPhotos } from '../../services/photoservices';
import { getStats } from '../../services/statsServices';

export default function ProfileScreen() {
  const [photos, setPhotos] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = {
    name: 'Amos Clegbaza',
    email: 'amos@example.com',
    city: 'Cotonou',
  };

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const allPhotos = await getAllPhotos();
      setPhotos(allPhotos);
      setStats(getStats(allPhotos));
    } catch (error) {
      console.log('Erreur ProfileScreen :', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Chargement du profil...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profil</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Informations utilisateur</Text>
        <Text style={styles.text}>Nom : {user.name}</Text>
        <Text style={styles.text}>Email : {user.email}</Text>
        <Text style={styles.text}>Ville : {user.city}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Statistiques</Text>
        <Text style={styles.text}>
          Nombre total de photos : {stats?.totalPhotos ?? 0}
        </Text>
        <Text style={styles.text}>
          Jour le plus actif : {stats?.mostActiveDay?.day ?? 'Aucun'}
        </Text>
        <Text style={styles.text}>
          Nombre de photos ce jour-là : {stats?.mostActiveDay?.count ?? 0}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Résumé</Text>
        <Text style={styles.text}>Photos enregistrées : {photos.length}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Dernières photos</Text>

        {photos.length === 0 ? (
          <Text style={styles.text}>Aucune photo enregistrée</Text>
        ) : (
          photos.slice(0, 5).map((photo, index) => (
            <View key={photo.uri || index} style={styles.photoItem}>
              <Text style={styles.text}>Date : {photo.date?.slice(0, 10)}</Text>
              <Text style={styles.text}>Lat : {photo.lat ?? 'Inconnue'}</Text>
              <Text style={styles.text}>Lon : {photo.lon ?? 'Inconnue'}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 6,
  },
  photoItem: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
    marginTop: 10,
  },
});