import { Colors } from "@/constants/Colors";
import { Pressable, StyleSheet } from "react-native";

interface IButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
}

export default function Button({ children, onPress, disabled }: IButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.button} disabled={disabled}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.cambridgeBlue,
    padding: 10,
    borderRadius: 6,
    justifyContent: "center",
  },
});
