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
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoFocus?: boolean;
}

export default function Input({
  placeholder = "Search",
  value,
  onChangeText,
  style,
  autoCapitalize = 'none',
  secureTextEntry = false,
  keyboardType = 'default',
  autoFocus = false,
}: IInputProps) {
  return (
    <TextInput
      placeholder={placeholder}
      style={[styles.input, style]}
      value={value}
      onChangeText={onChangeText}
      autoCapitalize={autoCapitalize}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoFocus={autoFocus}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Colors.light.black,
    borderRadius: 4,
    padding: 10,
  },
});
