import { View, StyleSheet } from "react-native";
import Type from "./Type";
import AlbumCard from "./AlbumCard";
import { Spacing } from "@/src/constants/Sizes";
interface ISectionProps {
  title: string;
  cards: any[];
}

export default function Section({ title, cards }: ISectionProps) {
  return (
    <View style={styles.container}>
      <Type type="themeTitle" style={styles.subTitle}>
        {title}
      </Type>

      <View style={styles.cardContainer}>
        {cards.map((item, index) => (
          <AlbumCard key={index} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: Spacing.padding.md,
  },
  subTitle: {
    fontSize: Spacing.fontSize.xxl,
    marginBottom: Spacing.padding.sm,
    // marginLeft: Spacing.padding.xxs,
  },
  cardContainer: {
    flexDirection: "row",
    gap: Spacing.padding.md,
    flexWrap: "wrap",
  },
});
