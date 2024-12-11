import { FlatList, StyleSheet, View, Dimensions } from "react-native"; // Import Dimensions
import { Button, TextInput } from "react-native-paper";
import { Text } from "@/components/Themed";
import React, { useState, useEffect } from "react";
import { db } from "@/FirebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Get screen dimensions
const { width, height } = Dimensions.get("window");

export default function TabTwoScreen() {
  const [userName, setUserName] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "ReactUser  "),
      (snapshot) => {
        const docs = [];
        snapshot.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() });
        });
        setData(docs);
      }
    );

    return () => unsubscribe();
  }, []);

  const addUser = async () => {
    const userObj = { name: userName };
    await addDoc(collection(db, "ReactUser  "), userObj);
    setUserName("");
  };

  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "ReactUser  ", id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mailing List</Text>
      <TextInput
        autoCapitalize="none"
        value={userName}
        placeholder="Add Person's Name"
        onChangeText={(text) => setUserName(text)}
        style={styles.input}
      />
      <Button mode="contained" onPress={addUser} style={styles.button}>
        Add Person
      </Button>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listText}>{item.name}</Text>
            <Button
              mode="outlined"
              onPress={() => deleteUser(item.id)}
              style={styles.deleteButton}
            >
              Delete
            </Button>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05, // Use width for responsive padding
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontWeight: "bold",
    fontSize: width * 0.06, // Responsive font size
    marginBottom: height * 0.02,
    textAlign: "center",
    color: "black",
  },
  input: {
    marginBottom: height * 0.02,
    backgroundColor: "#fff",
    color: "black",
  },
  button: {
    marginBottom: height * 0.02,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: width * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  listText: {
    fontSize: width * 0.045, // Responsive font size
    color: "black",
  },
  deleteButton: {
    padding: width * 0.02,
  },
});
