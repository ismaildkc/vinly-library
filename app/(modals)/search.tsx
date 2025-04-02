import { View, StyleSheet, SafeAreaView, TextInput, Pressable } from "react-native";
import { ActivityIndicator, FlatList } from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ISearchResult } from "@/constants/types";
import { discogsApi } from "@/services/discogs-api";
import { Colors } from "@/constants/Colors";
import Type from "@/components/Type";
import Input from "@/components/Input";
import Button from "@/components/button";
import ListItem from "@/components/ListItem";
import Octicons from "@expo/vector-icons/Octicons";

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
      setResults(result.results);
    } catch (err) {
      setError("Arama sırasında bir hata oluştu. Lütfen tekrar deneyin.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (item: ISearchResult) => {
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
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInput}>
            <Octicons name="search" size={20} color={Colors.light.white} />
            <TextInput
              placeholder="Search artists, songs, albums, and more..."
              value={search}
              onChangeText={setSearch}
              style={{ color: Colors.light.white }}
              autoFocus={true}
            />
          </View>
          <Pressable onPress={handleClose}><Type>Close</Type></Pressable>
        </View>

        <Type type="themeTitle" style={{fontSize: 18, marginTop: 10}}>Search Results</Type>

        {error && <Type>{error}</Type>}

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loader}
          />
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ListItem data={item} handleClick={handleSelect} />
            )}
            ListEmptyComponent={
              !loading && search.trim() ? (
                <Type style={styles.emptyText}>Sonuç bulunamadı</Type>
              ) : null
            }
          />
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
    padding: 16,
  },
  header: {
    backgroundColor: "blue",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 6,
  },
  searchInput: {
    backgroundColor: Colors.light.black,
    padding: 6,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  loader: {
    marginTop: 20,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
  },
});
