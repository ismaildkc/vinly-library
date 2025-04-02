import { View, Text, SafeAreaView, Button, Alert } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import { ILibraryItem } from "@/constants/types";

export default function LibraryScreen() {
  const { user } = useAuth();

  const passData = async (data: Omit<ILibraryItem, "userId" | "createdAt">) => {
    try {
      if (!user) {
        Alert.alert("Hata", "Lütfen önce giriş yapın");
        return;
      }

      // Firestore'a eklenecek veriyi hazırla
      const libraryItem: ILibraryItem = {
        ...data,
        userId: user.uid,
        createdAt: new Date()
      };

      // 'library' koleksiyonuna yeni döküman ekle
      const docRef = await addDoc(collection(db, "library"), libraryItem);
      console.log("Document written with ID: ", docRef.id);
      Alert.alert("Başarılı", "Kayıt başarıyla eklendi");
    } catch (error: any) {
      console.error("Error adding document: ", error);
      Alert.alert("Hata", error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <Text>LibraryScreen</Text>
        <Button title="Pass Data" onPress={() => passData(mockData)} />
      </View>
    </SafeAreaView>
  );
}


const mockData = {
  name: "Pink Floyd",
  image: "https://i.discogs.com/1234567890/1234567890.jpg",
  discogs_id: 10362,
  discogs_uri: "https://www.discogs.com/master/10362-Pink-Floyd-The-Dark-Side-Of-The-Moon",
  genres: ["Rock"],
  styles: ["Prog Rock", "Psychedelic Rock"],
  year: 1973,
}