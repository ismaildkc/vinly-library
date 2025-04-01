import { ISearchResult } from "@/constants/types";
import { TouchableOpacity, Image, Text, StyleSheet, View } from "react-native";

interface IListItemProps {
  data: ISearchResult;
  handleClick: (data: ISearchResult) => void;
}

export default function ListItem({ data, handleClick }: IListItemProps) {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handleClick(data)}
    >
      <Image
        source={{ uri: data.thumb || "https://via.placeholder.com/50" }}
        style={styles.thumb}
      />
      <View style={{ gap: 2 }}>
        <Text style={styles.title}>{data.title}</Text>
        {data.type !== 'artist' && (<Text>{data.year}</Text>)}
        <Text style={styles.type}>{data.type}</Text>
      </View>

      <View style={{ marginLeft: 'auto' }}>
        <Text>100$</Text>
      </View>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  thumb: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  type: {
    fontSize: 12,
    color: 'gray',
    textTransform: 'capitalize',
  },
})