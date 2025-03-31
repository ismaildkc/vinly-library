import React from "react";
import { Colors } from "@/constants/Colors";
import { StyleProp, Text, TextStyle, StyleSheet } from "react-native";

interface ILabelProps {
  label: string;
  style?: StyleProp<TextStyle>;
}

export default function Label({ label, style }: ILabelProps) {
  return <Text style={[styles.label, style]}>{label}</Text>;
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 5,
    color: Colors.light.darkSlateGray,
  },
});
