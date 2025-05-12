import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import { ILibraryItem, IGetReleaseDetails, IGetMasterDetails } from "@/src/constants/types";
import { discogsApi } from "../services/discogs-api";

interface IAddToLibrary {
  id: number;
  type: "master" | "release";
}

export const useAddToLibrary = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const addToLibrary = async ({ id, type }: IAddToLibrary) => {
    try {
      setLoading(true);
      if (!user) {
        console.log("Hata", "Lütfen önce giriş yapın");
        return;
      }
      
      let response: IGetReleaseDetails | IGetMasterDetails;

      if(type === "master") {
        response = await discogsApi.getMasterDetails(id.toString());
      }else {
        response = await discogsApi.getReleaseDetails(id.toString());
      }

      const payload: ILibraryItem = {
        userId: user.uid,
        createdAt: new Date(),
        type,
        
        discogs_id: response.id,
        year: response.year,
        resource_url: response.resource_url,
        uri: response.uri,
        genres: response.genres,
        images: response.images,
        styles: response.styles,
        title: response.title,
        artists: response.artists,
        tracklist: response.tracklist,
        num_for_sale: response.num_for_sale,
        lowest_price: response.lowest_price,
        data_quality: response.data_quality,
        

        thumb: type === "release" ? (response as IGetReleaseDetails).thumb : response.images[0].uri,
        labels: type === "release" ? (response as IGetReleaseDetails).labels : [],
        series: type === "release" ? (response as IGetReleaseDetails).series : [],
        companies: type === "release" ? (response as IGetReleaseDetails).companies : [],
        formats: type === "release" ? (response as IGetReleaseDetails).formats : [],
        country: type === "release" ? (response as IGetReleaseDetails).country : "",
        notes: type === "release" ? (response as IGetReleaseDetails).notes : "",
      };

      const docRef = await addDoc(collection(db, "library"), payload);
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
    } catch (error: any) {
      console.error("Error adding document: ", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { addToLibrary, isLoading: loading };
};
