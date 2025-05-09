import React from "react";
import { Colors } from "@/src/constants/Colors";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

interface ITypeProps {
  children: React.ReactNode;
  type?: "title" | "subtitle" | "body" | "themeTitle";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  style?: StyleProp<TextStyle>;
}

export default function Type({ children, type = "body", size = "md", style }: ITypeProps) {
  return <Text style={[styles.text, styles[type], styles[size], style]}>{children}</Text>;
}

const styles: any = StyleSheet.create({
  text: {
    fontFamily: 'KantumruyPro-VariableFont_wght',
    color: Colors.light.white,
  },
  xs: {
    fontSize: 10,
  },
  sm: {
    fontSize: 13,
  },
  md: {
    fontSize: 15,
  },
  lg: {
    fontSize: 17,
  },
  xl: {
    fontSize: 24,
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
    color: Colors.light.yellow,
  },
});
