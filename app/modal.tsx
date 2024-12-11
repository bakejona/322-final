import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/modal.tsx" />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: width * 0.05, // Responsive padding
  },
  title: {
    fontSize: width * 0.05, // Responsive font size
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: height * 0.03, // Responsive margin
    height: 1,
    width: '80%',
  },
});