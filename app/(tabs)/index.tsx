import { View, Text } from "react-native";
import { useState } from "react";

export default function HomeScreen() {
  const [selected, setSelected] = useState("artists");

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text>Home</Text>
    </View>
  );
}
