import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import { Size } from "@/src/constants/Sizes";
import Type from "@/src/components/Type";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import { IArtist, ILibraryItem } from "@/src/constants/types";
import { Colors } from "@/src/constants/Colors";
import { Link } from "expo-router";
import LibraryHeader from "@/src/containers/library/header";
import ListItem from "@/src/components/ListItem";
import ArtistCard from "@/src/components/ArtistCard";
import SectionRounded from "@/src/components/SectionRounded";
import { SortAlphabetically } from "@/src/helpers/helper";

export default function LibraryScreen() {
  const { user } = useAuth();
  const [libraryItems, setLibraryItems] = useState<ILibraryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [artists, setArtists] = useState<IArtist[]>([]);

  useEffect(() => {
    fetchLibraryItems();
  }, [user]);

  const fetchLibraryItems = async () => {
    console.log("fetchLibraryItems");
    try {
      if (!user) return;

      const q = query(
        collection(db, "library"),
        where("userId", "==", user.uid)
      );

      const querySnapshot = await getDocs(q);
      const items: ILibraryItem[] = [];

      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as ILibraryItem);
      });
      console.log(items);
      setLibraryItems(items);
      getArtists(items);
    } catch (error) {
      console.error("Error fetching library items:", error);
    } finally {
      setLoading(false);
    }
  };

  const getArtists = (items: ILibraryItem[]) => {
    const allArtists = items.flatMap((item) => item.artists);
    const uniqueArtists = allArtists.filter(
      (artist, index, self) =>
        index === self.findIndex((a) => a.id === artist.id)
    );

    console.log({ uniqueArtists });
    const sortedArtists = SortAlphabetically(uniqueArtists, "name");
    setArtists(sortedArtists);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LibraryHeader />

      <FlatList
        data={libraryItems}
        ListHeaderComponent={() => (
          <View>
            <SectionRounded
              title="Artists"
              cards={artists.map((item) => ({
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
            subTitle={item.artists.map((artist) => artist.name).join(", ")}
            year={item.year || ""}
            handleClick={() => null}
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
