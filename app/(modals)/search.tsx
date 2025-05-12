import {
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Pressable,
} from "react-native";
import { ActivityIndicator, FlatList } from "react-native";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ISearchResult } from "@/src/constants/types";
import { discogsApi } from "@/src/services/discogs-api";
import { Colors } from "@/src/constants/Colors";
import Type from "@/src/components/Type";
import ListItem from "@/src/components/ListItem";
import Octicons from "@expo/vector-icons/Octicons";
import { Size } from "@/src/constants/Sizes";
import { LegendList, LegendListRef } from "@legendapp/list";
import { useAddToLibrary } from "@/src/hooks/useAddToLibrary";
import { useDispatch } from "react-redux";
import { setIsLoading } from "@/src/store/global";

export default function SearchModal() {
  const dispatch = useDispatch();
  const listRef = useRef<LegendListRef | null>(null);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<ISearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { addToLibrary, isLoading } = useAddToLibrary();

  useEffect(() => {
    console.log("isLoading: ", isLoading);
    dispatch(setIsLoading(isLoading));
  }, [isLoading]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (search.trim()) {
        handleSearch();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search]);

  const handleSearch = async () => {
    if (!search.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const result = await discogsApi.search(search);
      console.log(result.results);
      setResults(result.results);
    } catch (err) {
      setError("Arama sırasında bir hata oluştu. Lütfen tekrar deneyin.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (item: ISearchResult) => {
    handleClose();
    if (item.type === "artist") {
      router.push(`/artist/${item.id}`);
    } else if (
      item.type === "release" ||
      item.type === "master" ||
      item.type === "label"
    ) {
      router.push(`/album/${item.id}`);
    }
  };

  const handleClose = () => {
    setSearch("");
    setResults([]);
    setError(null);
    setLoading(false);
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInput}>
            <Octicons name="search" size={20} color={Colors.light.gray} />
            <TextInput
              placeholder="Search artists, songs, albums, and more..."
              value={search}
              onChangeText={setSearch}
              style={{ color: Colors.light.white }}
              autoFocus={true}
              placeholderTextColor={Colors.light.gray}
            />
          </View>
          <Pressable onPress={handleClose}>
            <Type>Close</Type>
          </Pressable>
        </View>

        {error && <Type>{error}</Type>}

        {results.length > 0 && (
          <View style={{ flex: 1 }}>
            <Type
              type="themeTitle"
              style={{
                fontSize: Size.fontSize.xl,
                marginTop: Size.padding.md,
              }}
            >
              Search Results
            </Type>

            {loading ? (
              <ActivityIndicator
                size="small"
                color="#858585"
                style={styles.loader}
              />
            ) : (
              <View style={{ flex: 1 }}>
                <LegendList
                  data={results}
                  extraData={isLoading}
                  renderItem={({ item }) => { 
                    const isAddable = item.type !== 'artist' && item.type !== 'label';
                    return (
                      <ListItem
                        image={item.thumb}
                        title={item.title}
                        subTitle={isAddable ? `${item.type} - ${item.year}` : undefined}
                        handlePress={() => handleSelect(item)}
                        handleIconPress={() => isAddable && addToLibrary({ id: item.id, type: item.type as "release" | "master" })}
                        isAddable={isAddable}
                        isLoading={isLoading}
                      />
                    )}}
                  keyExtractor={(item, index) => `${index}-${item.id.toString()}`}
                  recycleItems={true}
                  maintainVisibleContentPosition
                  ref={listRef}
                />
              </View>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Size.padding.lg,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: Size.padding.sm,
  },
  searchInput: {
    backgroundColor: Colors.light.primaryLight,
    padding: Size.padding.sm,
    borderRadius: Size.borderRadius.sm,
    flexDirection: "row",
    alignItems: "center",
    gap: Size.padding.sm,
    flex: 1,
  },
  loader: {
    marginTop: Size.padding.md,
  },
  emptyText: {
    textAlign: "center",
    marginTop: Size.padding.md,
  },
});
