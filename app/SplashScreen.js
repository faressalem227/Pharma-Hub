import { useEffect } from "react";
import { View,Text, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/WelcomeScreen"); 
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      {/* <Image source={require("../assets/images/splash-removebg-preview.png")} style={styles.image} /> */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Your <Text style={styles.healthText}>health</Text> companion
        </Text>
        <Text style={styles.text}>anytime, anywhere</Text>
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
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  textContainer: {
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "#65CEC9",
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 28,
    fontFamily:"Retro-Spring",
  },
  healthText: {
    color: "#24828D",
    fontWeight: "bold",
    fontFamily:"Retro-Spring",
  },
});
