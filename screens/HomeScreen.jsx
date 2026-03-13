import React from 'react';
import { View, Text, Pressable, StyleSheet, SafeAreaView } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      
      {/* --- MENU / PROFILE / LOGOUT (Haut à droite) --- */}
      <View style={styles.header}>
        <View style={styles.menuTextGroup}>
          {/* On utilise onPress sur le texte ou un bouton pour ouvrir le drawer */}
          <Pressable onPress={() => navigation.openDrawer()}>
            <Text style={styles.menuText}>☰ Menu</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Profil')}>
            <Text style={styles.menuText}>Profile</Text>
          </Pressable>
          <Pressable onPress={() => console.log('Logout')}>
            <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
          </Pressable>
        </View>
      </View>

      {/* --- ZONE DE CONTENU (Vide pour l'instant) --- */}
      <View style={styles.content}>
        
      </View>

      {/* --- BARRE DE NAVIGATION (Bas de l'écran) --- */}
      <View style={styles.tabBar}>
        <Pressable style={styles.tabButton} onPress={() => navigation.navigate('Camera')}>
          <Text style={styles.tabText}>Cam</Text>
        </Pressable>
        <Pressable style={styles.tabButton} onPress={() => navigation.navigate('Carte')}>
          <Text style={styles.tabText}>Carte</Text>
        </Pressable>
        <Pressable style={styles.tabButton} onPress={() => navigation.navigate('Calendrier')}>
          <Text style={styles.tabText}>Cal</Text>
        </Pressable>
        <Pressable style={styles.tabButton} onPress={() => navigation.navigate('Photos')}>
          <Text style={styles.tabText}>Pho</Text>
        </Pressable>
        <Pressable style={styles.tabButton} onPress={() => navigation.navigate('Profil')}>
          <Text style={styles.tabText}>Pro</Text>
        </Pressable>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4A6FA5',
    margin: 10,
  },
  header: {
    alignItems: 'flex-end', // Pousse le contenu à droite
    padding: 20,
  },
  menuTextGroup: {
    alignItems: 'flex-start', // Aligne les textes du bloc à gauche par rapport à eux-mêmes
  },
  menuText: {
    fontSize: 18,
    color: '#000',
    marginBottom: 5,
  },
  logoutText: {
    textDecorationLine: 'underline', // Pour le style "Lien"
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Pour espacer les boutons
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  tabButton: {
    backgroundColor: '#4A6FA5',
    padding: 10,
    borderRadius: 4,
    width: '18%', // Largeur égale pour les 5 boutons
    alignItems: 'center',
  },
  tabText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});