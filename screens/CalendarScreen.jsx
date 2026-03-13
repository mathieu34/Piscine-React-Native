import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars'; // Bibliothèque dédiée

export default function CalendarScreen() {
  return (
    <View style={styles.container}>
      <Calendar
        // On marque des dates pour l'exemple
        markedDates={{
          '2026-03-11': { selected: true, marked: true, selectedColor: '#00adf5' },
          '2026-03-15': { marked: true, dotColor: 'red' },
        }}
        theme={{
          todayTextColor: '#00adf5',
          arrowColor: '#00adf5',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, backgroundColor: '#fff' },
});