import { View, Text, SafeAreaView } from "react-native";
import { useState } from "react";

export default function HomeScreen() {
  const [selected, setSelected] = useState("artists");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <Text>Home</Text>
      </View>
    </SafeAreaView>
  );
}
