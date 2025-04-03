import { Colors } from "@/src/constants/Colors";
import { Pressable, StyleSheet } from "react-native";
import { Spacing } from "@/src/constants/Sizes";
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
    padding: Spacing.padding.md,
    borderRadius: Spacing.borderRadius.sm,
    justifyContent: "center",
    alignItems: "center",
  },
  primary: {
    backgroundColor: Colors.light.primaryLight,
    color: Colors.light.white,
  },
  secondary: {
    backgroundColor: Colors.light.yellow,
    color: Colors.light.black,
  },
});
