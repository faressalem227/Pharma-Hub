import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/welcome-removebg-preview.png")} style={styles.image} />
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Step into your health hub.</Text>
      <View style={styles.pagination}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/FinalScreen")}>
        <Text style={styles.buttonText}>Next</Text>
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
    backgroundColor: "#E4ECED",
    padding:10,
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
    marginTop: 0,
    bottom:90,
    fontFamily:"Retro-Spring",

  },
  subtitle: {
    fontSize: 14,
    color: "#768385",
    textAlign: "center",
    paddingHorizontal: 30,
    bottom:90,
  },
  pagination: {
    flexDirection: "row",
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
