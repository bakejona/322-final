import { Alert, StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { Button } from "react-native-paper";

export default function picture() {
  const [image, setImage] = useState(null);

  const takePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveToCameraRoll = async () => {
    if (!image) {
      Alert.alert("No image to save");
      return;
    }

    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    try {
      await MediaLibrary.saveToLibraryAsync(image);
      Alert.alert("Success: Image saved to camera roll");
    } catch (error) {
      Alert.alert("Failed saving image", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Button onPress={takePicture}>Take Picture</Button>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {image && <Button onPress={saveToCameraRoll}>Save to Camera Roll</Button>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
    borderRadius: 10,
  },
});

// expo install expo-image-picker
// expo install expo-media-library
