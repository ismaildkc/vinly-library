import { TouchableOpacity, Image, Text, StyleSheet } from "react-native";

interface IListItemProps {
  data: any[];
  renderItem: (item: any) => React.ReactNode;
}

export default function ListItem({ data, renderItem }: IListItemProps) {
  return (
    <TouchableOpacity
      style={styles.artistItem}
      onPress={() => handleSelectArtist(item)}
    >
      <Image
        source={{ uri: item.thumb || "https://via.placeholder.com/50" }}
        style={styles.artistThumb}
      />
      <Text style={styles.artistName}>{item.title}</Text>
    </TouchableOpacity>
  );
}
