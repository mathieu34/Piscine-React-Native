import { StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <Text style={styles.info}>Nom : Mathieu</Text>
      <Text style={styles.info}>Photos prises : 0</Text>
      <Text style={styles.info}>Lieux visités : 0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    justifyContent: "center",
    alignItems: "center"
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20
  },

  info: {
    fontSize: 18,
    marginVertical: 5
  }
});