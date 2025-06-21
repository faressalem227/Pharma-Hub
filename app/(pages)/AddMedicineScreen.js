import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function AddMedicineScreen() {
  const [medicineName, setMedicineName] = useState("");
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.logoText}>
          Med<Text style={styles.logoHighlight}>Reminder</Text>
        </Text>
      </View>
      <View style={styles.divider} />
      <Text style={styles.title}>What medicine do you want to add?</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter medicine name"
        placeholderTextColor="#aaa"
        value={medicineName}
        onChangeText={setMedicineName}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/SelectTypeScreen")}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      <View style={styles.bottomBar}>
        <Ionicons name="home-outline" size={24} color="#777" />
        <Ionicons name="search-outline" size={24} color="#777" />
        <Ionicons
          name="ellipsis-horizontal-circle-outline"
          size={28}
          color="#3C9D8D"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
    paddingLeft: 99,
  },
  logoHighlight: {
    color: "#3C9D8D",
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 30,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 30,
    alignSelf: "center",
    width: "90%",
    backgroundColor: "#F2F2F2",
  },
  divider: {
    height: 3,
    backgroundColor: "#E0E0E0",
    marginVertical: 10,
  },

  button: {
    backgroundColor: "#3C9D8D",
    padding: 12,
    borderRadius: 20,
    width: "50%",
    alignSelf: "center",
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "600" },
  bottomBar: {
    position: "absolute",
    bottom: 30,
    width: Dimensions.get("window").width - 40,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
