import { Stack } from "expo-router";

export default function PhotosLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Galerie" }}
      />

      <Stack.Screen
        name="detail"
        options={{ title: "Détail Photo" }}
      />
    </Stack>
  );
}