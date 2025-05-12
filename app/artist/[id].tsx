import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams, Stack, Link, router } from "expo-router";
import { discogsApi } from "@/src/services/discogs-api";
import TopBar from "@/src/components/common/TopBar";
import Type from "@/src/components/Type";
import { Size } from "@/src/constants/Sizes";
import ListItem from "@/src/components/ListItem";
import ArtistMini from "@/src/components/common/ArtistMini";
import CollapseBox from "@/src/components/common/CollapseBox";
import { LegendList, LegendListRef } from "@legendapp/list";
import { useSelector } from "react-redux";
import { Artist, ILibraryItem, IRelease } from "@/src/constants/types";
import { useAddToLibrary } from "@/src/hooks/useAddToLibrary";

interface IArtistDetails {
  id: number;
  name: string;
  profile: string;
  images?: { uri: string }[];
  urls?: string[];
  members?: any[];
}

export default function ArtistDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [artist, setArtist] = useState<IArtistDetails | null>(null);
  const [releases, setReleases] = useState<IRelease[]>([]);
  const [isBand, setIsBand] = useState(false);
  const listRef = useRef<LegendListRef | null>(null);

  const { addToLibrary, isLoading } = useAddToLibrary();

  const ownedAlbums: ILibraryItem[] = useSelector(
    (state: any) => state.library.albums
  );

  useEffect(() => {
    if (id) {
      fetchArtistData();
    }
  }, [id]);
  
  useEffect(() => {
  
  }, [isLoading]);

  const fetchArtistData = async () => {
    try {
      // Sanatçı bilgilerini ve albümlerini paralel olarak getir
      const [artistData, releasesData] = await Promise.all([
        discogsApi.getArtist(id),
        discogsApi.getArtistReleases(id),
      ]);

      // console.log({ artistData, releasesData, ownedAlbums });
      const owned: any[] = getArtistOwnedAlbums(ownedAlbums, id);
      const merged: IRelease[] = [...owned, ...releasesData.releases];

      setIsBand(artistData.members?.length > 0);
      setArtist(artistData);
      setReleases(merged);
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  const getArtistOwnedAlbums = (myAlbums: ILibraryItem[], artistId: string) => {
    const data = myAlbums.filter((album) =>
      album.artists.some((artist: Artist) => artist.id === Number(artistId))
    );

    return data.map((d) => {
      return {
        id: d.discogs_id,
        title: d.title,
        year: d.year,
        resource_url: d.resource_url,
        artist: d.artists[0].name,
        isExist: true,
      };
    });
  };

  const addTo = async (itemId: number, itemType: "master" | "release") => {
    await addToLibrary({ id: itemId, type: itemType });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopBar />
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView style={{ paddingHorizontal: Size.padding.sm }}>
        {/* Artist Image */}
        {artist?.images && artist.images.length > 0 && (
          <View>
            <Image
              source={{ uri: artist?.images[0].uri }}
              style={styles.artistImage}
            />
          </View>
        )}

        <View
          style={{ paddingHorizontal: 0, paddingVertical: Size.padding.md }}
        >
          <Type type="themeTitle" style={styles.title}>
            {artist?.name} {isBand && <Type>(Band)</Type>}
          </Type>

          {isBand && (
            <View style={styles.membersContainer}>
              <Type style={{ fontWeight: "bold" }}>Members: </Type>

              <CollapseBox height={90}>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  {artist?.members?.map((member: any, index: number) => (
                    <React.Fragment key={index}>
                      <Link
                        href={`/artist/${member.id}`}
                        style={{ paddingVertical: 2 }}
                      >
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
                </View>
              </CollapseBox>
            </View>
          )}

          <Type style={{ fontWeight: "bold" }}>About:</Type>
          <CollapseBox height={100}>
            <Type>{artist?.profile}</Type>
          </CollapseBox>

          <Type type="themeTitle" style={styles.title}>
            Albums
          </Type>

          <LegendList
            data={releases}
            renderItem={({ item }) => (
              <ListItem
                image={item.thumb}
                title={item.title}
                subTitle={[item.year, item.type, item.label].filter(Boolean).join(" - ")}
                handleIconPress={() => addTo(item.id, item.type || "master")}
                handlePress={() => router.push(`/album/${item.id}`)}
                isAddable={!item.isExist}
                isLoading={isLoading}
              />
            )}
            keyExtractor={(item, index) => `${index}-${item.id.toString()}`}
            recycleItems={true}
            maintainVisibleContentPosition
            ref={listRef}
          />
        </View>
      </ScrollView>
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
