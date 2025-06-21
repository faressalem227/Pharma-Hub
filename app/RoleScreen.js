import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function RoleScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Role</Text>
      <Text style={styles.subtitle}>Your role to continue!</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/user-screen")}>
        <Text style={styles.buttonText}>User</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/pharmacy-screen")}>
        <Text style={styles.buttonText}>Pharmacy</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EAF7FA",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#24828D",
  },
  subtitle: {
    fontSize: 14,
    color: "#768385",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#24828D",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 15,
    width: "90%",
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#E4ECED",
    fontSize: 16,
    fontWeight: "bold",
  },
});
