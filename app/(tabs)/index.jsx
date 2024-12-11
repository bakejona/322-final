import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { signOut, getAuth } from "firebase/auth";
import { useNavigation } from "expo-router";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function TabOneScreen() {
  const auth = getAuth();
  const navigation = useNavigation();

  const signUserOut = async () => {
    try {
      await signOut(auth).then(() => {
        console.log("User signed out");
        navigation.replace("index");
      });
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the App!</Text>
      <Text style={styles.description}>
        This application allows you to manage your profile, take pictures, and
        more.
      </Text>
      <View style={styles.buttonContainer}>
        <Text style={styles.instructionText}>
          Press the button below to sign out.
        </Text>
        <Button
          mode="contained"
          onPress={signUserOut}
          style={styles.signOutButton}
        >
          Sign Out
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: "bold",
    marginBottom: height * 0.02,
  },
  description: {
    fontSize: width * 0.045,
    textAlign: "center",
    marginBottom: height * 0.02,
    paddingHorizontal: width * 0.1,
  },
  buttonContainer: {
    marginTop: height * 0.02,
    alignItems: "center",
  },
  instructionText: {
    fontSize: width * 0.04,
    textAlign: "center",
    marginBottom: height * 0.01,
  },
  signOutButton: {
    width: "80%",
  },
});
