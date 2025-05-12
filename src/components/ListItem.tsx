import { Image, Text, StyleSheet, View, Pressable, ActivityIndicator } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "@/src/constants/Colors";
import { Size } from "@/src/constants/Sizes";

interface IListItemProps {
  image: string;
  title: string;
  subTitle?: string;
  type?: string;
  isAddable?: boolean;
  isLoading?: boolean;
  size?: "sm" | "md" | "lg";
  
  handlePress?: () => void;
  handleIconPress?: () => void;
}

export default function ListItem({ image, title, subTitle, isAddable = false, isLoading = false, handlePress, handleIconPress, size = "md" }: IListItemProps) {
  return (
    <Pressable style={styles.item} onPress={handlePress}>
      <Image
        source={{ uri: image || "https://via.placeholder.com/50" }}
        style={styles.thumb}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        {subTitle &&<Text style={styles.type}>{subTitle}</Text>}
      </View>

      {isAddable && !isLoading && (
        <Pressable onPress={handleIconPress}>
          <View style={{ marginLeft: "auto" }}>
            <Feather name="plus-circle" size={20} color={Colors.light.white} />
          </View>
        </Pressable>
      )}

      {isLoading && (
        <View style={{ marginLeft: "auto" }}>
          <ActivityIndicator size="small" color={Colors.light.white} />
        </View>
      )}
    </Pressable>
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
    width: 45,
    height: 45,
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
