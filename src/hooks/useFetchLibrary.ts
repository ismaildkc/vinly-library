import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useAuth } from '@/context/AuthContext';
import { ILibraryItem, Artist } from '@/src/constants/types';
import { SortAlphabetically } from '@/src/helpers/helper';

export const useFetchLibrary = () => {
  const [albums, setAlbums] = useState<ILibraryItem[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchLibraryItems();
  }, [user]);

  const fetchLibraryItems = async () => {
    try {
      if (!user) return;

      const q = query(
        collection(db, "library"),
        where("userId", "==", user.uid)
      );

      const querySnapshot = await getDocs(q);
      const items: ILibraryItem[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Firestore timestamp'i serileştirilebilir formata dönüştür
        const createdAt = data.createdAt ? data.createdAt.toDate().toISOString() : new Date().toISOString();
        
        items.push({ 
          id: doc.id, 
          ...data,
          createdAt: createdAt 
        } as ILibraryItem);
      });
      setAlbums(items);
      getArtists(items);
    } catch (error) {
      console.error("Error fetching library items:", error);
    } finally {
      setLoading(false);
    }
  };

  const getArtists = (items: ILibraryItem[]) => {
    const allArtists = items.flatMap((item) => item.artists);
    const uniqueArtists = allArtists.filter(
      (artist, index, self) =>
        index === self.findIndex((a) => a.id === artist.id)
    );

    const sortedArtists = SortAlphabetically(uniqueArtists, "name");
    setArtists(sortedArtists);
  };

  return { albums, artists, isLoading: loading, refreshLibrary: fetchLibraryItems };
};