import { View, SafeAreaView, StyleSheet, FlatList, Image } from "react-native";
import { Size } from "@/src/constants/Sizes";
import Type from "@/src/components/Type";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import { ILibraryItem } from "@/src/constants/types";
import { Colors } from "@/src/constants/Colors";
import { Link } from "expo-router";

export default function LibraryScreen() {
  const { user } = useAuth();
  const [libraryItems, setLibraryItems] = useState<ILibraryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLibraryItems();
  }, []);

  const fetchLibraryItems = async () => {
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
    } catch (error) {
      console.error("Error fetching library items:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: ILibraryItem }) => (
    <Link href={`/album/${item.discogs_id}`} asChild>
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.albumImage} />
        <View style={styles.itemInfo}>
          <Type style={styles.albumTitle}>{item.name}</Type>
          <Type style={styles.albumYear}>{item.year}</Type>
        </View>
      </View>
    </Link>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Type style={styles.title}>My Library</Type>
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <Type>Loading...</Type>
        </View>
      ) : libraryItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Type>Your library is empty</Type>
        </View>
      ) : (
        <FlatList
          data={libraryItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id || ""}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.primaryDark,
  },
  header: {
    padding: Size.padding.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.primaryLight,
  },
  title: {
    fontSize: Size.fontSize.xl,
    fontWeight: "bold",
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
    padding: Size.padding.md,
  },
  itemContainer: {
    flexDirection: "row",
    padding: Size.padding.sm,
    marginBottom: Size.padding.sm,
    backgroundColor: Colors.light.primaryDark,
    borderRadius: 8,
    alignItems: "center",
  },
  albumImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  itemInfo: {
    marginLeft: Size.padding.md,
    flex: 1,
  },
  albumTitle: {
    fontSize: Size.fontSize.md,
    fontWeight: "bold",
    color: Colors.light.white,
  },
  albumYear: {
    fontSize: Size.fontSize.sm,
    color: Colors.light.gray,
    marginTop: 4,
  },
}); 