import { Colors } from "@/constants/Colors";
import { View, StyleSheet, Image } from "react-native";
import Type from "./Type";

export default function AlbumCard() {
  return (
    <View style={styles.card}>
      <Image source={{ uri: 'https://picsum.photos/200' }} style={styles.image} />
      <Type type="themeTitle" style={styles.title}>Album Title</Type>
      <Type>Album info</Type>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 100,
    maxWidth: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 4,
    resizeMode: "cover",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
});
