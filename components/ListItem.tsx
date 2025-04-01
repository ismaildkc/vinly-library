import { ISearchResult } from "@/constants/types";
import { TouchableOpacity, Image, Text, StyleSheet, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "@/constants/Colors";

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

      <View style={{ marginLeft: "auto" }}>
        <Feather name="plus-circle" size={20} color="black" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.gray,
    alignItems: "center",
  },
  thumb: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  contentContainer: {
    gap: 3,
    minWidth: 0,
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  type: {
    fontSize: 12,
    color: "gray",
    textTransform: "capitalize",
  },
});
