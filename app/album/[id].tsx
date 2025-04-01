import React, { useEffect, useState } from "react";
import { View, Image, ScrollView, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, Stack, Link } from "expo-router";
import { discogsApi } from "@/services/discogs-api";
import Octicons from "@expo/vector-icons/Octicons";
import Feather from "@expo/vector-icons/Feather";

export default function AlbumDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [album, setAlbum] = useState<any>(null);

  useEffect(() => {
    console.log(id);
    fetchAlbumData(id);
  }, [id]);

  const fetchAlbumData = async (_id: string) => {
    try {
      const album = await discogsApi.getMasterDetails(_id);
      console.log(album);
      setAlbum(album);
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  return (
    <ScrollView>
      <Stack.Screen options={{ title: "Sanatçı Detayları" }} />
      {/* Cover Image */}
      <View style={{ paddingVertical: 10 }}>
        <Image
          source={{ uri: album?.images[0].resource_url }}
          style={styles.coverImage}
        />
      </View>

      {/* Album Title */}
      <View style={{ padding: 10, gap: 5 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Text style={styles.title}>{album?.title}</Text>
          <Feather name="plus-circle" size={20} color="black" />
        </View>

        <View style={{ flexDirection: "row", gap: 10 }}>
          {album?.artists.map((artist: any, index: number) => (
            <View key={index}>
              <Link href={`/artist/${artist.id}`}>
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    gap: 5,
                    paddingTop: 5,
                  }}
                >
                  <Image
                    source={{ uri: artist.thumbnail_url }}
                    style={styles.miniThumbnail}
                  />
                  <Text>{artist.name}</Text>
                </View>
              </Link>
              {index !== album?.artists.length - 1 && (
                <Octicons name="dot-fill" size={12} color="black" />
              )}
            </View>
          ))}
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Text>Album</Text>
          <Octicons name="dot-fill" size={12} color="black" />
          <Text>{album?.year}</Text>
        </View>
      </View>

      {/* Album Images */}
      <View style={{ padding: 10, gap: 5 }}>
        <Text>Album Images</Text>
        <View style={{ flexDirection: "row", gap: 5, flexWrap: "wrap" }}>
          {album?.images.map((img: any) => (
            <Image
              source={{ uri: img.resource_url }}
              style={{ width: 25, height: 25, borderRadius: 4 }}
            />
          ))}
        </View>
      </View>

      {/* Album Tracks */}
      <View style={{ padding: 10, gap: 5 }}>
        <Text style={styles.subTitle}>Album Tracks</Text>
        <View style={{ flexDirection: "column", gap: 5, flexWrap: "wrap" }}>
          {album?.tracklist.map((track: any, index: number) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 5,
              }}
            >
              <Text>{track.title}</Text>
              <Text>{track.duration || "00:00"}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  coverImage: {
    width: "100%",
    height: 200,
    objectFit: "contain",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  miniThumbnail: {
    width: 18,
    height: 18,
    borderRadius: 15,
  },
});
