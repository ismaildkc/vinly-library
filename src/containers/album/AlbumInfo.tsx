import Type from "@/src/components/Type";
import { Colors } from "@/src/constants/Colors";
import { View } from "react-native";

interface IAlbumInfoProps {
  album: any;
}

export default function AlbumInfo({ album }: IAlbumInfoProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        flexWrap: "wrap",
        paddingTop: 10,
      }}
    >
      <View>
        <Type>
          <Type style={{ fontWeight: "bold", color: Colors.light.yellow }}>
            Type:{" "}
          </Type>
          Album
        </Type>
      </View>

      <View>
        <Type>
          <Type style={{ fontWeight: "bold", color: Colors.light.yellow }}>
            Year:{" "}
          </Type>
          {album?.year}
        </Type>
      </View>

      <View>
        <Type>
          <Type style={{ fontWeight: "bold", color: Colors.light.yellow }}>
            Genre:{" "}
          </Type>
          {album?.genres.join(", ")}
        </Type>
      </View>

      <View>
        <Type>
          <Type style={{ fontWeight: "bold", color: Colors.light.yellow }}>
            Sales:{" "}
          </Type>
          {album?.num_for_sale}
        </Type>
      </View>
    </View>
  );
}
