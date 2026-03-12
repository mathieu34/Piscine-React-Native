import { Button, Text, View } from "react-native";

export default function LogoutScreen() {
  return (
    <View>
      <Text>Logout</Text>
      <Button title="Se déconnecter" onPress={() => console.log("logout")} />
    </View>
  );
}