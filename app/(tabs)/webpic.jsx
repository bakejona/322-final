import { StyleSheet, Text, View, Button, Image } from "react-native";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

export default function webpic() {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const capturePhoto = () => {
    const image = webcamRef.current.getScreenshot();
    setImageSrc(image);
  };

  return (
    <View style={styles.container}>
      {!imageSrc ? (
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={styles.webcam}
        />
      ) : (
        <Image source={{ uri: imageSrc }} style={styles.capturedImage} />
      )}
      <Button
        title={!imageSrc ? "Capture" : "Retake"}
        onPress={() => {
          if (imageSrc) {
            setImageSrc(null);
          } else {
            capturePhoto();
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  webcam: {
    width: 400,
    height: 300,
  },
  capturedImage: {
    width: 400,
    height: 300,
  },
});
