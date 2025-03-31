import React from "react";
import { Colors } from "@/constants/Colors";
import {
  StyleSheet,
  TextInput,
} from "react-native";

interface IInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
}

export default function Input({
  placeholder = "Search",
  value,
  onChangeText,
}: IInputProps) {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: Colors.light.darkSlateGray,
    borderRadius: 5,
    padding: 10,
  },
});
