import { Colors } from "@/src/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable } from "react-native";

import { View } from "react-native";

export default function TopBar() {
  return (
    <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
      <Pressable onPress={() => router.back()}>
        <Feather name="arrow-left" size={20} color={Colors.light.gray} />
      </Pressable>
    </View>
  );
}
