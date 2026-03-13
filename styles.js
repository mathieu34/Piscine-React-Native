import { StyleSheet, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
  // 1. LE CONTENEUR PRINCIPAL
  container: {
    flex: 1, // Occupe tout l'écran
    backgroundColor: '#FFFFFF',
    // La bordure bleue visible sur ton schéma
    borderWidth: 2,
    borderColor: '#4A6FA5', 
    margin: 10, // Petit espace autour de la bordure
    // Ajustement pour ne pas chevaucher la barre d'état (iOS/Android)
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  // 2. LE HEADER (Menu, Profile, Logout)
  header: {
    flexDirection: 'column',
    alignItems: 'flex-end', // Pousse tout le bloc vers la droite
    paddingTop: 20,
    paddingRight: 20,
  },
  menuTextGroup: {
    alignItems: 'flex-start', // Aligne les textes à gauche à l'intérieur du bloc de droite
  },
  menuText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  logoutText: {
    color: '#000',
    textDecorationLine: 'underline',
  },

  // 3. ZONE DE CONTENU (Le milieu de l'écran)
  content: {
    flex: 1, // Cette vue va "pousser" la barre de navigation vers le bas
    justifyContent: 'center',
    alignItems: 'center',
  },

  // 4. LA BARRE DE NAVIGATION DU BAS (Custom Tab Bar)
  tabBar: {
    flexDirection: 'row', // Aligne les boutons horizontalement
    justifyContent: 'space-between', // Espace égal entre les boutons
    paddingHorizontal: 10,
    paddingBottom: 25, // Un peu plus d'espace en bas pour le confort
  },
  tabButton: {
    backgroundColor: '#4A6FA5',
    paddingVertical: 12,
    width: '18%', // Permet de faire tenir les 5 boutons avec un petit écart
    borderRadius: 4, // Légèrement arrondi
    alignItems: 'center',
    justifyContent: 'center',
    // Petit effet d'ombre pour Android/iOS
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  tabText: {
    color: '#FFFFFF', // Texte blanc sur fond bleu
    fontSize: 14,
    fontWeight: 'bold',
  },

  // 5. STYLES GÉNÉRIQUES 
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A6FA5',
    marginBottom: 20,
  }
});