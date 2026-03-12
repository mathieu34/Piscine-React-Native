import { Drawer } from "expo-router/drawer";

export default function RootLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        headerTitle: "Menu",
        drawerType: "front",
        drawerLabelStyle: {
          fontSize: 16
        }
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: "Accueil",
          drawerLabel: "Accueil"
        }}
      />

      <Drawer.Screen
        name="profile"
        options={{
          title: "Profile",
          drawerLabel: "Profile"
        }}
      />

      <Drawer.Screen
        name="logout"
        options={{
          title: "Logout",
          drawerLabel: "Logout"
        }}
      />
    </Drawer>
  );
}


/* import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
} */
