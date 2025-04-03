import React from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import Type from "@/src/components/Type";
import Search from "@/src/components/Search";
import Section from "@/src/components/Section";
import { Spacing } from "@/src/constants/Sizes";

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

        <Section title="Popular Albums" cards={[1,1,1,1,1,1]} />
        <Section title="New Releases" cards={[1,1,1,1,1,1]} />

        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.padding.lg,
  },
  subTitle: {
    fontSize: Spacing.fontSize.xxl,
    marginBottom: Spacing.padding.sm,
  },
});
