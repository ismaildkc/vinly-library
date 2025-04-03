import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams, Stack, Link } from "expo-router";
import { discogsApi } from "@/src/services/discogs-api";
import AlbumTitle from "@/src/containers/album/AlbumTitle";
import { Size } from "@/src/constants/Sizes";
import Type from "@/src/components/Type";
import { Colors } from "@/src/constants/Colors";
import CoverImage from "@/src/containers/album/CoverImage";
import TopBar from "@/src/components/common/TopBar";
import TrackList from "@/src/containers/album/TrackList";

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
    <SafeAreaView style={styles.container}>
      <TopBar />

      <ScrollView>
        <Stack.Screen options={{ headerShown: false }} />
        {/* Cover Image */}
        <CoverImage album={album} />

        <View style={styles.innerContainer}>
          {/* Album Title */}
          <AlbumTitle album={album} />

          <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap", paddingTop: 10 }}>
            <View>
              <Type>
                <Type style={{ fontWeight: "bold", color: Colors.light.yellow }}>
                  Type:{" "}
                </Type>
                Album
              </Type>
            </View>

            <View>
              <Type>
                <Type style={{ fontWeight: "bold", color: Colors.light.yellow }}>
                  Year:{" "}
                </Type>
                {album?.year}
              </Type>
            </View>

            <View>
              <Type>
                <Type style={{ fontWeight: "bold", color: Colors.light.yellow }}>
                  Genre:{" "}
                </Type>
                {album?.genres.join(", ")}
              </Type>
            </View>
            
            <View>
              <Type>
                <Type style={{ fontWeight: "bold", color: Colors.light.yellow }}>
                  Sales:{" "}
                </Type>
                {album?.num_for_sale}
              </Type>
            </View>
          </View>


          {/* Album Tracks */}
          <TrackList album={album} />
        </View>

        {/* Album Images */}
        {/* <View style={{ padding: 10, gap: 5 }}>
          <Type>Album Images</Type>
          <View style={{ flexDirection: "row", gap: 5, flexWrap: "wrap" }}>
            {album?.images.map((img: any) => (
              <Image
                source={{ uri: img.resource_url }}
                style={{ width: 25, height: 25, borderRadius: 4 }}
              />
            ))}
          </View>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.primaryDark,
  },
  innerContainer: {
    padding: 10,
    gap: 5,
  },
});
