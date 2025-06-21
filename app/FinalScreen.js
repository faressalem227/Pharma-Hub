import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function FinalScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/Third-removebg-preview.png")} style={styles.image} />
      <Text style={styles.title}>Health First!</Text>
      <Text style={styles.subtitle}>Your personal pharmacy at your fingertips.</Text>
      <View style={styles.pagination}>
        <View style={styles.dot} />
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/RoleScreen")}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
      </View>
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
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    bottom:90,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#24828D",
    bottom:90,
    marginTop: 0,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 30,
    bottom:90,
    color:"#768385",
  },
  pagination: {
    flexDirection: "row",
    // marginTop: 210,
    bottom: -170,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#65CEC9B0",
    marginHorizontal: 4,
  },
  activeDot: {
    width: 13,
    backgroundColor: "#24828D",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#24828D",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 15,
    width: "90%",
    alignItems: "center",
  },
  buttonText: {
    color: "#E4ECED",
    fontSize: 16,
    fontWeight: "bold",
  },
});
