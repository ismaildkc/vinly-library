import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams, Stack, Link } from "expo-router";
import { discogsApi } from "@/src/services/discogs-api";
import TopBar from "@/src/components/common/TopBar";
import Type from "@/src/components/Type";
import { Size } from "@/src/constants/Sizes";
import ListItem from "@/src/components/ListItem";
// Tip tanımlamaları
interface IArtistDetails {
  id: number;
  name: string;
  profile: string;
  images?: { uri: string }[];
  urls?: string[];
  members?: any[];
}

interface Release {
  id: number;
  title: string;
  year: string;
  thumb: string;
  resource_url: string;
}

export default function ArtistDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [artist, setArtist] = useState<IArtistDetails | null>(null);
  const [releases, setReleases] = useState<Release[]>([]);
  const [showFullProfile, setShowFullProfile] = useState(false);
  useEffect(() => {
    if (id) {
      fetchArtistData();
    }
  }, [id]);

  const fetchArtistData = async () => {
    try {
      // Sanatçı bilgilerini ve albümlerini paralel olarak getir
      const [artistData, releasesData] = await Promise.all([
        discogsApi.getArtist(id),
        discogsApi.getArtistReleases(id),
      ]);

      setArtist(artistData);
      setReleases(releasesData.releases);
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopBar />
      <Stack.Screen options={{ headerShown: false }} />

      <FlatList
        data={releases}
        ListHeaderComponent={() => (
          <>
            {/* Artist Image */}
            {artist?.images && artist.images.length > 0 && (
              <View>
                <Image
                  source={{ uri: artist?.images[0].uri }}
                  style={styles.artistImage}
                />
              </View>
            )}

            <View style={{ padding: Size.padding.md }}>
              <Type type="themeTitle" style={styles.title}>
                {artist?.name}
              </Type>

              <View style={styles.membersContainer}>
                <Type style={{ fontWeight: "bold" }}>Members: </Type>
                {artist?.members?.map((member: any, index: number) => (
                  <React.Fragment key={index}>
                    <Link href={`/artist/${member.id}`}>
                      <Type style={styles.memberLink}>{member.name}</Type>
                    </Link>
                    {index < (artist?.members?.length || 0 - 1) && (
                      <Type style={styles.separator}>, </Type>
                    )}
                  </React.Fragment>
                ))}
              </View>

              <View
                style={[
                  styles.descriptionContainer,
                  { height: !showFullProfile ? 100 : "auto" },
                ]}
              >
                <Type>{artist?.profile}</Type>
                <TouchableOpacity
                  style={styles.showMoreButton}
                  onPress={() => setShowFullProfile(!showFullProfile)}
                >
                  <Type>Show more...</Type>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
        renderItem={({ item }) => (
          <ListItem
            image={item.thumb}
            title={item.title}
            subTitle={item.year}
            year={item.year || ""}
            handleClick={() => null}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: Size.padding.md }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  artistImage: {
    width: "100%",
    height: 250,
    objectFit: "cover",
  },
  title: {
    fontSize: Size.fontSize.xl,
    fontWeight: "bold",
  },
  membersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginVertical: Size.padding.sm,
  },
  memberLink: {
    
  },
  separator: {
    marginHorizontal: 2,
  },
  descriptionContainer: {
    // maxHeight: 100,
    overflow: "hidden",
    position: "relative",
  },
  showMoreButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});
