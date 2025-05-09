import {
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from "react-native";
import { Size } from "@/src/constants/Sizes";
import Type from "@/src/components/Type";
import { useEffect, useState } from "react";
import { IArtist, ILibraryItem } from "@/src/constants/types";
import { Colors } from "@/src/constants/Colors";
import { Link, router } from "expo-router";
import LibraryHeader from "@/src/containers/library/header";
import ListItem from "@/src/components/ListItem";
import SectionRounded from "@/src/components/SectionRounded";
import { useSelector } from "react-redux";

export default function LibraryScreen() {
  const isLoading = useSelector((state: any) => state.library.isLoading);
  const albums = useSelector((state: any) => state.library.albums);
  const artists = useSelector((state: any) => state.library.artists);

  useEffect(() => {

  }, [])


  return (
    <SafeAreaView style={styles.container}>
      <LibraryHeader />

      <FlatList
        data={albums}
        ListHeaderComponent={() => (
          <View>
            <SectionRounded
              title="Artists"
              cards={artists.map((item: IArtist) => ({
                id: item.id,
                thumbnail_url: item.thumbnail_url,
                name: item.name,
              }))}
            />
            <Type type="themeTitle" style={styles.title}>
              Albums
            </Type>
          </View>
        )}
        renderItem={({ item }) => (
          <ListItem
            image={item.image}
            title={item.name}
            subTitle={`${item.artists.map((artist: IArtist) => artist.name).join(", ")} - ${item.year}`}
            handleClick={() => router.push(`/album/${item.discogs_id}`)}
          />
        )}
        keyExtractor={(item) => item.id || ""}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Type>Your library is empty</Type>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.primaryDark,
  },
  sectionContainer: {
    flex: 1,
    // paddingHorizontal: Size.padding.md,
    paddingVertical: Size.padding.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    paddingHorizontal: Size.padding.md,
  },
  title: {
    fontSize: Size.fontSize.xxl,
    marginLeft: Size.padding.md,
  },
});
