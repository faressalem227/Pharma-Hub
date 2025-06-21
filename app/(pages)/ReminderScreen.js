import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ReminderScreen() {
  const router = useRouter();
  const [reminders, setReminders] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const loadReminders = async () => {
        try {
          const stored = await AsyncStorage.getItem("reminders");
          if (stored) {
            setReminders(JSON.parse(stored));
          }
        } catch (e) {
          console.error("Error loading reminders:", e);
        }
      };

      loadReminders();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.logoText}>
          Med<Text style={styles.logoHighlight}>Reminder</Text>
        </Text>
      </View>
      <View style={styles.divider} />

      <Text style={styles.greeting}>Good Morning</Text>
      <Text style={styles.userName}>Gracy</Text>
      <ScrollView style={{ marginBottom: 120 }}>
        {reminders.map((reminder, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.time}>{reminder.time}</Text>
            </View>
            <View style={[styles.row, { marginTop: 10 }]}>
              <MaterialCommunityIcons
                name="pill"
                size={25}
                color="#fff"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.medName}>{reminder.name}</Text>
            </View>
            <Text style={styles.details}>{reminder.details}</Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.navigate("/AddMedicineScreen")}
      >
        <Ionicons name="add" size={28} color="#3C9D8D" />
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
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  iconWrapper: { marginRight: 8 },
  logoText: { fontSize: 18, fontWeight: "600", color: "#222", paddingLeft: 95 },
  logoHighlight: { color: "#00A896" },
  divider: { height: 3, backgroundColor: "#E0E0E0", marginVertical: 10 },
  greeting: { fontSize: 16, color: "#555" },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#3C9D8D",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    width: "100%",
    marginBottom: 20,
  },
  row: { flexDirection: "row", alignItems: "center" },
  time: { fontSize: 14, color: "#fff", fontWeight: "700" },
  medName: { fontSize: 16, color: "#fff", fontWeight: "bold" },
  details: { fontSize: 13, color: "#E6F5F2", marginTop: 8, marginLeft: 26 },
  fab: {
    position: "absolute",
    bottom: 90,
    right: 30,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#3C9D8D",
    borderRadius: 18,
    padding: 10,
    elevation: 5,
  },
});
