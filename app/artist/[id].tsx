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
import ArtistMini from "@/src/components/common/ArtistMini";
import CollapseBox from "@/src/components/common/CollapseBox";
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

      console.log({ artistData, releasesData });

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

            <View style={{ paddingHorizontal: 0, paddingVertical: Size.padding.md }}>
              <Type type="themeTitle" style={styles.title}>
                {artist?.name}{" "}
                {!!artist?.members?.length && <Type>(Band)</Type>}
              </Type>

              <View style={styles.membersContainer}>
                <Type style={{ fontWeight: "bold" }}>Members: </Type>

                <CollapseBox height={100}>
                  {artist?.members?.map((member: any, index: number) => (
                    <React.Fragment key={index}>
                      <Link href={`/artist/${member.id}`}>
                        <ArtistMini
                          name={member.name}
                          image={member.thumbnail_url}
                        />
                      </Link>
                      {index < (artist?.members?.length || 0 - 1) && (
                        <Type style={styles.separator}>, </Type>
                      )}
                    </React.Fragment>
                  ))}
                </CollapseBox>
              </View>

              <Type type="themeTitle" style={styles.title}>
                Albums
              </Type>
            </View>
          </>
        )}
        renderItem={({ item }) => (
          <ListItem
            image={item.thumb}
            title={item.title}
            subTitle={item.year}
            handleClick={() => null}
            isAddable={true}
            isExist={true}
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
  memberLink: {},
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
