import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const options = [
  "Daily",
  "Once a week",
  "2 days a week",
  "3 days a week",
  "4 days a week",
  "5 days a week",
  "6 days a week",
  "Once a month",
  "Alternate days",
];

export default function HowOftenScreen() {
  const [selected, setSelected] = useState(null);
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
      <Text style={styles.title}>How often do you take this medicine?</Text>
      <ScrollView>
        {options.map((opt, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={() => setSelected(opt)}
          >
            <View style={styles.radioCircle}>
              {selected === opt && <View style={styles.selectedRb} />}
            </View>
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/FirstDoseTimeScreen")}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
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
    marginBottom: 10,
  },
  divider: {
    height: 3,
    backgroundColor: "#E0E0E0",
    marginBottom: 20,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
    paddingLeft: 80,
  },
  logoHighlight: {
    color: "#3C9D8D",
  },
  title: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    // marginBottom: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#3C9D8D",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#3C9D8D",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#3C9D8D",
    padding: 12,
    borderRadius: 20,
    width: "50%",
    alignSelf: "center",
    marginBottom: 270,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  bottomBar: {
    position: "absolute",
    bottom: 30,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
