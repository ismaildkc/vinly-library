import React from "react";
import { Colors } from "@/constants/Colors";
import {
  StyleSheet,
  TextInput,
  StyleProp,
  TextStyle,
} from "react-native";

interface IInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: StyleProp<TextStyle>;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export default function Input({
  placeholder = "Search",
  value,
  onChangeText,
  style,
  autoCapitalize = 'none',
}: IInputProps) {
  return (
    <TextInput
      placeholder={placeholder}
      style={[styles.input, style]}
      value={value}
      onChangeText={onChangeText}
      autoCapitalize={autoCapitalize}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: Colors.light.cambridgeBlue,
    borderRadius: 5,
    padding: 10,
  },
});
