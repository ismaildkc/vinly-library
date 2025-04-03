import { Size } from "@/src/constants/Sizes";
import { View, Image, StyleSheet } from "react-native";

interface ICoverImageProps {
  album: any;
}

export default function CoverImage({ album }: ICoverImageProps) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: album?.images[0].resource_url }}
        style={styles.bg}
        blurRadius={50}
      />
      <Image
        source={{ uri: album?.images[0].resource_url }}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Size.padding.xl,
    position: "relative",
    alignItems: "center",
  },
  bg: {
    width: "100%",
    objectFit: "cover",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    opacity: 0.5,
  },
  image: {
    aspectRatio: 1,
    height: 200,
    objectFit: "contain",
    borderRadius: Size.borderRadius.sm,
    overflow: "hidden",
  },
});
