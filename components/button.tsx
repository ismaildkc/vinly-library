import { Colors } from "@/constants/Colors";
import { Pressable, StyleSheet } from "react-native";

interface IButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  primary?: boolean;
}

export default function Button({ children, onPress, disabled, primary = true }: IButtonProps) {
  return (
    <Pressable onPress={onPress} style={[styles.button, primary ? styles.primary : styles.secondary]} disabled={disabled}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  primary: {
    backgroundColor: Colors.light.black,
    color: Colors.light.white,
  },
  secondary: {
    backgroundColor: Colors.light.yellowDark,
    color: Colors.light.black,
  },
});
