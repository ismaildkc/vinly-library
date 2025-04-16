import { TouchableOpacity, Image, Text, StyleSheet, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "@/src/constants/Colors";
import { Size } from "@/src/constants/Sizes";

interface IListItemProps {
  handleClick: () => void;
  image: string;
  title: string;
  subTitle?: string;
  type?: string;
  year: string | number;
}

export default function ListItem({ image, title, subTitle, type, year, handleClick }: IListItemProps) {
  return (
    <TouchableOpacity style={styles.item} onPress={() => handleClick()}>
      <Image
        source={{ uri: image || "https://via.placeholder.com/50" }}
        style={styles.thumb}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        {subTitle && <Text style={styles.type}>{subTitle}</Text>}
        <Text style={styles.type}>{type} - {year}</Text>
      </View>

      {/* {(type === "master" || type === "release") && (
        <View style={{ marginLeft: "auto" }}>
          <Feather name="plus-circle" size={20} color={Colors.light.white} />
        </View>
      )} */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    paddingVertical: Size.padding.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.primaryLight,
    alignItems: "center",
    gap: Size.padding.lg,
  },
  thumb: {
    width: 60,
    height: 60,
    borderRadius: Size.borderRadius.sm,
  },
  contentContainer: {
    gap: 4,
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
