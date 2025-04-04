import { ISearchResult } from "@/src/constants/types";
import { TouchableOpacity, Image, Text, StyleSheet, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "@/src/constants/Colors";
import { Size } from "@/src/constants/Sizes";

interface IListItemProps {
  data: ISearchResult;
  handleClick: (data: ISearchResult) => void;
}

export default function ListItem({ data, handleClick }: IListItemProps) {
  return (
    <TouchableOpacity style={styles.item} onPress={() => handleClick(data)}>
      <Image
        source={{ uri: data.thumb || "https://via.placeholder.com/50" }}
        style={styles.thumb}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {data.title}
        </Text>
        <Text style={styles.type}>{data.type} - {data.year}</Text>
      </View>

      {(data.type === "master" || data.type === "release") && (
        <View style={{ marginLeft: "auto" }}>
          <Feather name="plus-circle" size={20} color={Colors.light.white} />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.primaryLight,
    alignItems: "center",
    gap: 15,
  },
  thumb: {
    width: 55,
    height: 55,
    borderRadius: 8,
  },
  contentContainer: {
    gap: 3,
    minWidth: 0,
    flex: 1,
  },
  title: {
    fontSize: Size.fontSize.sm,
    fontWeight: "bold",
    color: Colors.light.white,
  },
  type: {
    fontSize: Size.fontSize.xs,
    color: Colors.light.gray,
    textTransform: "capitalize",
  },
});
