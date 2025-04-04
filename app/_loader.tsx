import { View, ActivityIndicator, StyleSheet } from "react-native";
import Type from "@/src/components/Type";
import { Colors } from "@/src/constants/Colors";

interface LoaderProps {
  message?: string;
}

export default function Loader({ message }: LoaderProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.light.white} />
      {message && <Type style={styles.message}>{message}</Type>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  message: {
    color: Colors.light.white,
    marginTop: 10,
  }
});