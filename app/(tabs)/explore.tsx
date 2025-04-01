import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Label from "@/components/Label";
import Input from "@/components/Input";
import { discogsApi } from "@/services/discogs-api";
import { router } from "expo-router";
import ListItem from "@/components/ListItem";
import { ISearchResult } from "@/constants/types";
import Toggle from "@/components/Toggle";
import Button from "@/components/button";

const toggledata: any[] = [
  { label: "All", value: "all" },
  { label: "Artists", value: "artists" },
  { label: "Albums", value: "albums" },
  { label: "Songs", value: "songs" },
];

export default function ExploreScreen() {
  const [selectedType, setSelectedType] = useState("all");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<ISearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!search.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const result = await discogsApi.search(search);
      console.log(result);
      setResults(result.results);
    } catch (err) {
      setError("Arama sırasında bir hata oluştu. Lütfen tekrar deneyin.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (item: ISearchResult) => {
    console.log(item);
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

  return (
    <View style={styles.container}>
      <View style={{ paddingBottom: 10 }}>
        <Toggle
          data={toggledata}
          selectedValue={selectedType}
          onPress={(item) => {
            setSelectedType(item.value);
            console.log(item);
          }}
        />
      </View>
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search artists, songs, albums, and more..."
          value={search}
          onChangeText={setSearch}
          style={{ flex: 1 }}
        />
        <Button onPress={handleSearch} disabled={loading}>
          <Text style={{ color: "white" }}>Search</Text>
        </Button>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ListItem data={item} handleClick={handleSelect} />
          )}
          ListEmptyComponent={
            !loading && search.trim() ? (
              <Text style={styles.emptyText}>Sonuç bulunamadı</Text>
            ) : null
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 5,
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
});
