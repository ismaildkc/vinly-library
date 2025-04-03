import { View, StyleSheet } from "react-native";
import Type from "@/src/components/Type";
import { Size } from "@/src/constants/Sizes";
import { Colors } from "@/src/constants/Colors";

interface ITrackListProps {
  album: any;
}

export default function TrackList({ album }: ITrackListProps) {
  return (
    <View style={styles.container}>
      <Type style={styles.title}>Album Tracks</Type>
      <View style={{ flexDirection: "column", gap: 5 }}>
        {album?.tracklist.map((track: any, index: number) => (
          <View key={index} style={styles.trackRow}>
            <Type>{track.title}</Type>
            <Type>{track.duration || "00:00"}</Type>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Size.padding.xl,
    gap: 5,
  },
  title: {
    fontSize: Size.fontSize.lg,
    fontWeight: "bold",
    color: Colors.light.yellow,
  },
  trackRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.primaryLight,
    paddingVertical: Size.padding.sm,
  },
});
