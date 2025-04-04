import { View, ActivityIndicator, StyleSheet } from "react-native";
import Type from "@/src/components/Type";
import { Colors } from "@/src/constants/Colors";
import { Size } from "@/src/constants/Sizes";

interface LoaderProps {
  message?: string;
}

export default function Loader({ message = "Loading..." }: LoaderProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <ActivityIndicator size="small" color={Colors.light.yellow} />
      </View>
      {message && <Type style={styles.message}>{message}</Type>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  container: {
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.primaryDark,
    borderRadius: Size.borderRadius.md,
  },
  message: {
    color: Colors.light.yellow,
    marginTop: 10,
    fontSize: Size.fontSize.md,
  }
});