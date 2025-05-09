import { Colors } from "@/src/constants/Colors";
import Type from "@/src/components/Type";
import { View, Image, StyleSheet } from "react-native";
import { Size } from "@/src/constants/Sizes";

interface IArtistMiniProps {
  name: string;
  image?: string;
}

export default function ArtistMini({ name, image }: IArtistMiniProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Type size="sm">{name}</Type>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: Size.padding.xs,
  },
  image: {
    width: 25,
    height: 25,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.light.primaryLight,
    padding: 2,
  },
});
