import Type from "@/src/components/Type";
import { Colors } from "@/src/constants/Colors";
import { Size } from "@/src/constants/Sizes";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, View, StyleSheet } from "react-native";

export default function LibraryHeader() {
  return (
    <View style={styles.header}>
      <Type style={styles.title}>Library</Type>

      <Pressable style={styles.profile} onPress={() => router.push("/profile")}>
        <FontAwesome name="user" size={14} color={Colors.light.white} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: Size.padding.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.primaryLight,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: Size.fontSize.xl,
    fontWeight: "bold",
  },
  profile: {
    backgroundColor: Colors.light.primaryLight,
    padding: Size.padding.sm,
    borderRadius: '100%',
    width: 32,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  }
});
