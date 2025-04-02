import React from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import Type from "@/components/Type";
import Search from "@/components/Search";
import AlbumCard from "@/components/AlbumCard";

const toggledata: any[] = [
  { label: "All", value: "all" },
  { label: "Artists", value: "artists" },
  { label: "Albums", value: "albums" },
  { label: "Songs", value: "songs" },
];

export default function ExploreScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Type type="themeTitle" style={styles.subTitle}>
          Search
      </Type>
      <Search />

      <Type type="themeTitle" style={styles.subTitle}>
        Popular Albums
      </Type>

      <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
        {[1, 1, 1, 1, 1, 1].map((item, index) => (
          <AlbumCard key={index} />
        ))}
      </View>
      
      <Type type="themeTitle" style={styles.subTitle}>
        New Releases
      </Type>

      <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
        {[1, 1, 1, 1, 1, 1].map((item, index) => (
          <AlbumCard key={index} />
          ))}
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
  subTitle: {
    fontSize: 22,
    marginBottom: 8,
  },
});
