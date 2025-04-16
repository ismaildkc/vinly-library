import {
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Pressable,
} from "react-native";
import { ActivityIndicator, FlatList } from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ISearchResult } from "@/src/constants/types";
import { discogsApi } from "@/src/services/discogs-api";
import { Colors } from "@/src/constants/Colors";
import Type from "@/src/components/Type";
import Input from "@/src/components/Input";
import Button from "@/src/components/button";
import ListItem from "@/src/components/ListItem";
import Octicons from "@expo/vector-icons/Octicons";
import { Size } from "@/src/constants/Sizes";

export default function SearchModal() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<ISearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
                <FlatList
                  data={results}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <ListItem 
                      image={item.thumb} 
                      title={item.title} 
                      type={item.type} 
                      year={item.year || ""} 
                      handleClick={() => handleSelect(item)} 
                    />
                  )}
                  ListEmptyComponent={
                    !loading && search.trim() ? (
                      <Type style={styles.emptyText}>Sonuç bulunamadı</Type>
                    ) : null
                  }
                />
              </View>
            )}
          </View>
        )}
      </View>

      {/* <View style={styles.searchContainer}>
          <Input
            placeholder="Search artists, songs, albums, and more..."
            value={search}
            onChangeText={setSearch}
            style={{ flex: 1 }}
            autoFocus={true}
          />
          <Button onPress={handleSearch} disabled={loading}>
            <Type style={{ color: "white" }}>Search</Type>
          </Button>
        </View>

        

         */}
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
