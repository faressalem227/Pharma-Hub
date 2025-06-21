import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
export const unstable_settings = {
  initialRouteName: 'SplashRScreen',
};

export const options = {
  tabBarStyle: { display: 'none' },
};

export default function SplashScreen() {
  const router = useRouter();
  const { width } = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <View style={[styles.headerCircle, { width: width * 1.5, height: width * 1.5, borderBottomRightRadius: width *0.75 }]}>
        <Text style={styles.headerText}>Why be worried about{'\n'}forgetting to take your{'\n'}medicine when you have</Text>
        <Text style={styles.subText}>Pharma Hub’s{'\n'}<Text style={styles.highlight}>MedReminder</Text></Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.paragraph}>
          <Text style={{ fontWeight: 'bold' }}>MedReminder</Text> is a simple feature inside
          the app that helps you remember to take
          your medications on time. You can easily
          add the name of your medicine, the dosage,
          and how many times per day you need to take it.
          You can also choose the exact times for each dose.
          The app will then send you a notification at each
          scheduled time to remind you to take your
          medication. This feature is especially useful if
          you have a chronic condition or need to take
          medicine regularly and want an easy way to stay on track.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/ReminderScreen')}
      >
        <Text style={styles.buttonText}>Get Started!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerCircle: {
    backgroundColor: '#CCD6FF',
    position: 'absolute',
    top: -380,
    left: -120,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    // marginBottom: -350,
    marginLeft:150,
  },
  subText: {
    fontSize: 14,
    color: '#444',
    top:20,
    marginBottom: -350,
    marginLeft:150,
  },
  highlight: {
    color: '#24828D',
    fontWeight: '800',
  },
  body: {
    marginTop: '60%',
    paddingHorizontal: 20,
  },
  paragraph: {
    fontSize: 19,
    color: '#444',
    lineHeight: 25,
  },
  button: {
    backgroundColor: '#24828D',
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 190,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
