import { View, StyleSheet, Image } from "react-native";
import Type from "./Type";
import { Size } from "../constants/Sizes";

interface IArtistCardProps {
  image: string;
  name: string;
}

export default function ArtistCard({ image, name }: IArtistCardProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Type style={styles.title}>{name}</Type>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Size.padding.sm,
  },
  image: {
    width: 80,
    minHeight: 80,
    aspectRatio: 1,
    borderRadius: 50,
    // flexShrink: 0,
  },
  title: {
    textAlign: "center",
    flexGrow: 1,
    // flexShrink: 1,
  },
});
