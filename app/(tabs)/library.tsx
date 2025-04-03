import { View, SafeAreaView, StyleSheet } from "react-native";
import { Size } from "@/src/constants/Sizes";
import Type from "@/src/components/Type";

export default function LibraryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, padding: 16 }}>
        <Type>LibraryScreen</Type>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Size.padding.md,
  },
}); 