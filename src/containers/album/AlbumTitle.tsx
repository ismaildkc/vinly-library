import { View, StyleSheet, Image, Pressable } from "react-native";
import { Link } from "expo-router";
import { Colors } from "@/src/constants/Colors";
import Type from "@/src/components/Type";
import Octicons from "@expo/vector-icons/Octicons";
import Feather from "@expo/vector-icons/Feather";
import { Size } from "@/src/constants/Sizes";

interface IAlbumTitleProps {
  album: any;
  onAddToLibrary: () => void;
  onAddToWishlist: () => void;
}

export default function AlbumTitle({ album, onAddToLibrary, onAddToWishlist }: IAlbumTitleProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Type style={styles.title}>{album?.title}</Type>
        <Pressable onPress={onAddToLibrary}>
          <Feather name="plus-circle" size={Size.fontSize.lg} color={Colors.light.gray} />
        </Pressable>
        <Pressable onPress={onAddToWishlist}>
          <Feather name="heart" size={Size.fontSize.lg} color={Colors.light.gray} />
        </Pressable>
      </View>

      <View style={{ flexDirection: "row", gap: 10 }}>
        {album?.artists.map((artist: any, index: number) => (
          <View key={index} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <Link href={`/artist/${artist.id}`}>
              <View style={styles.artistContainer}>
                <Image
                  source={{ uri: artist.thumbnail_url }}
                  style={styles.miniThumbnail}
                />
                <Type style={styles.artistName}>{artist.name}</Type>
              </View>
            </Link>
            {index !== album?.artists.length - 1 && (
              <Octicons name="dot-fill" size={12} color={Colors.light.yellow} style={{ marginTop: 6 }} />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Size.padding.xs,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingTop: Size.padding.sm,
  },
  title: {
    fontSize: Size.fontSize.xl,
    fontWeight: "bold",
  },
  artistContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
    paddingTop: 5,
  },
  miniThumbnail: {
    width: 24,
    height: 24,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.light.gray,
    padding: 3,
  },
  artistName: {
    color: Colors.light.gray,
  },
});
