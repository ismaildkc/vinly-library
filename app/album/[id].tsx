import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams, Stack, Link } from "expo-router";
import { discogsApi } from "@/src/services/discogs-api";
import AlbumTitle from "@/src/containers/album/AlbumTitle";
import Type from "@/src/components/Type";
import { Colors } from "@/src/constants/Colors";
import CoverImage from "@/src/containers/album/CoverImage";
import TopBar from "@/src/components/common/TopBar";
import TrackList from "@/src/containers/album/TrackList";
import AlbumInfo from "@/src/containers/album/AlbumInfo";
import { useAuth } from "@/context/AuthContext";
import { ILibraryItem } from "@/src/constants/types";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export default function AlbumDetailScreen() {
  const { user } = useAuth();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [album, setAlbum] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(id);
    fetchAlbumData(id);
  }, [id]);

  const fetchAlbumData = async (_id: string) => {
    try {
      const album = await discogsApi.getMasterDetails(_id);
      console.log(album);
      setAlbum(album);
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  const addToLibrary = async () => {
    try {
      setLoading(true);
      if (!user) {
        console.log("Hata", "Lütfen önce giriş yapın");
        return;
      }

      const payload: ILibraryItem = {
        userId: user.uid,
        createdAt: new Date(),

        name: album.title,
        image: album.images[0].resource_url,
        discogs_id: album.id,
        discogs_uri: album.uri,
        genres: album.genres,
        styles: album.styles,
        year: album.year,
        artists: album.artists,
      }

      // 'library' koleksiyonuna yeni döküman ekle
      const docRef = await addDoc(collection(db, "library"), payload);
      console.log("Document written with ID: ", docRef.id);
      
    } catch (error: any) {
      console.error("Error adding document: ", error);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = () => {
    console.log("addToWishlist");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar />

      <ScrollView>
        <Stack.Screen options={{ headerShown: false }} />
        {/* Cover Image */}
        <CoverImage album={album} />

        <View style={styles.innerContainer}>
          {/* Album Title */}
          <AlbumTitle
            album={album}
            onAddToLibrary={addToLibrary}
            onAddToWishlist={addToWishlist}
          />

          {/* Album Info */}
          <AlbumInfo album={album} />

          {/* Album Tracks */}
          <TrackList album={album} />

          {/* Album Images */}
          <View style={{ paddingTop: 10, paddingBottom: 30, gap: 5 }}>
            <Type>Album Images</Type>
            <View style={{ flexDirection: "row", gap: 5, flexWrap: "wrap" }}>
              {album?.images.map((img: any, index: number) => (
                <Image
                  key={index}
                  source={{ uri: img.resource_url }}
                  style={{ width: 25, height: 25, borderRadius: 4 }}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.primaryDark,
  },
  innerContainer: {
    padding: 10,
    gap: 5,
  },
});
