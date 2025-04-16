import { View, StyleSheet, FlatList } from "react-native";
import Type from "./Type";
import { Size } from "@/src/constants/Sizes";
import ArtistCard from "./ArtistCard";
import { Link } from "expo-router";
import { IArtist } from "../constants/types";

interface ISectionProps {
  title: string;
  cards: IArtist[];
}

export default function SectionRounded({ title, cards }: ISectionProps) {
  return (
    <View style={styles.container}>
      <Type type="themeTitle" style={styles.title}>
        {title}
      </Type>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + Size.padding.lg}
        snapToAlignment="start"
        data={cards}
        renderItem={({ item, index }) => (
          <Link
            key={index}
            href={`/artist/${item.id}`}
            style={styles.cardWrapper}
          >
            <ArtistCard
              image={item.thumbnail_url || "https://picsum.photos/200"}
              name={item.name || "Artist Name"}
            />
          </Link>
        )}
      />
    </View>
  );
}

const CARD_WIDTH = 120;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: Size.fontSize.xxl,
    marginBottom: Size.padding.sm,
    marginLeft: Size.padding.md,
  },
  scrollContainer: {
    paddingHorizontal: Size.padding.md,
  },
  cardWrapper: {
    width: CARD_WIDTH,
    maxWidth: CARD_WIDTH,
  },
});
