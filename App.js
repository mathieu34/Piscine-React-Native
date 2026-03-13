import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import des écrans (à créer dans le dossier screens)
import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';
import MapScreen from './screens/MapScreen';
import CalendarScreen from './screens/CalendarScreen';
import PhotoScreen from './screens/PhotoScreen'; // Ta liste de photos
import DetailScreen from './screens/DetailScreen'; // Détail d'une photo
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// 1. STACK pour la navigation Photos -> Détails
function PhotosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PhotosList" component={PhotoScreen} options={{ title: 'Galerie' }} />
      <Stack.Screen name="PhotoDetail" component={DetailScreen} options={{ title: 'Détail Photo' }} />
    </Stack.Navigator>
  );
}

// 2. TAB NAVIGATOR (Le coeur de l'app)
function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#4A6FA5' }}>
      <Tab.Screen name="Camera" component={CameraScreen} options={{ title: 'Cam' }} />
      <Tab.Screen name="Carte" component={MapScreen} options={{ title: 'Carte' }} />
      <Tab.Screen name="Calendrier" component={CalendarScreen} options={{ title: 'Cal' }} />
      <Tab.Screen name="Photos" component={PhotosStack} options={{ title: 'Pho' }} />
      <Tab.Screen name="Profil" component={ProfileScreen} options={{ title: 'Pro' }} />
    </Tab.Navigator>
  );
}

// 3. DRAWER NAVIGATOR (La racine)
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="AppPrincipal">
        <Drawer.Screen name="AppPrincipal" component={MainTabs} options={{ title: 'Accueil' }} />
        <Drawer.Screen name="MonProfil" component={ProfileScreen} options={{ title: 'Mon Profil' }} />
        {/* On peux ajouter un bouton Logout personnalisé ici */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}