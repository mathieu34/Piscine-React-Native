import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { filterPhotos, getAllPhotos } from '../../services/photoservices';

export default function CalendarScreen() {
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    loadCalendarData();
  }, []);

  const loadCalendarData = async () => {
    try {
      const allPhotos = await getAllPhotos();
      setFilteredPhotos(allPhotos);

      const marks = {};

      allPhotos.forEach((photo) => {
        const day = photo.date?.slice(0, 10);
        if (!day) return;

        marks[day] = {
          marked: true,
          dotColor: '#2196f3',
        };
      });

      setMarkedDates(marks);
    } catch (error) {
      console.log('Erreur CalendarScreen :', error);
    }
  };

  const handleDayPress = async (day) => {
    const selected = day.dateString;
    setSelectedDate(selected);

    try {
      const result = await filterPhotos({ date: selected });
      setFilteredPhotos(result);

      const allPhotos = await getAllPhotos();
      const marks = {};

      allPhotos.forEach((photo) => {
        const photoDay = photo.date?.slice(0, 10);
        if (!photoDay) return;

        marks[photoDay] = {
          marked: true,
          dotColor: '#2196f3',
        };
      });

      marks[selected] = {
        ...(marks[selected] || {}),
        marked: true,
        dotColor: '#2196f3',
        selected: true,
        selectedColor: '#4caf50',
      };

      setMarkedDates(marks);
    } catch (error) {
      console.log('Erreur sélection date :', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendrier</Text>

      <Calendar
        markedDates={markedDates}
        onDayPress={handleDayPress}
        theme={{
          todayTextColor: '#2196f3',
          arrowColor: '#2196f3',
          selectedDayTextColor: '#ffffff',
        }}
      />

      <View style={styles.resultBox}>
        <Text style={styles.sectionTitle}>
          {selectedDate ? `Photos du ${selectedDate}` : 'Toutes les photos'}
        </Text>

        <FlatList
          data={filteredPhotos}
          keyExtractor={(item, index) => item.uri || index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.text}>Date : {item.date?.slice(0, 10)}</Text>
              <Text style={styles.text}>Latitude : {item.lat ?? 'Inconnue'}</Text>
              <Text style={styles.text}>Longitude : {item.lon ?? 'Inconnue'}</Text>
              <Text style={styles.text}>URI : {item.uri || 'Aucune'}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Aucune photo pour cette date</Text>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  resultBox: {
    flex: 1,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  text: {
    fontSize: 15,
    marginBottom: 4,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});