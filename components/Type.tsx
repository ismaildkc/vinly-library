import React from "react";
import { Colors } from "@/constants/Colors";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

interface ITypeProps {
  children: React.ReactNode;
  type?: "title" | "subtitle" | "body" | "caption" | "themeTitle";
  style?: StyleProp<TextStyle>;
}

export default function Type({ children, type = "body", style }: ITypeProps) {
  return <Text style={[styles.text, styles[type], style]}>{children}</Text>;
}

const styles: any = StyleSheet.create({
  text: {
    fontFamily: 'KantumruyPro-Regular',
    color: Colors.light.black,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  body: {
    fontSize: 14,
    fontWeight: "normal",
  },
  themeTitle: {
    fontFamily: "DMSerifDisplay",
    fontSize: 28,
    fontWeight: "bold",
  },
});
