import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { discogsApi } from '@/services/discogs-api';

// Tip tanımlamaları
interface ArtistDetails {
  id: number;
  name: string;
  profile: string;
  images?: { uri: string }[];
  urls?: string[];
}

interface Release {
  id: number;
  title: string;
  year: string;
  thumb: string;
  resource_url: string;
}

export default function ArtistDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [artist, setArtist] = useState<ArtistDetails | null>(null);
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtistData = async () => {
      setLoading(true);
      try {
        // Sanatçı bilgilerini ve albümlerini paralel olarak getir
        const [artistData, releasesData] = await Promise.all([
          discogsApi.getArtist(id),
          discogsApi.getArtistReleases(id)
        ]);
        
        setArtist(artistData);
        setReleases(releasesData.releases);
      } catch (err) {
        setError('Sanatçı bilgileri yüklenirken bir hata oluştu.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArtistData();
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Stack.Screen options={{ title: artist?.name || 'Sanatçı Detayları' }} />
      <View style={styles.container}>
        {artist && (
          <View style={styles.artistInfo}>
            {artist.images && artist.images.length > 0 && (
              <Image 
                source={{ uri: artist.images[0].uri }} 
                style={styles.artistImage} 
              />
            )}
            <Text style={styles.artistName}>{artist.name}</Text>
            <Text style={styles.artistBio}>{artist.profile}</Text>
          </View>
        )}

        <Text style={styles.sectionTitle}>Albümler</Text>
        <FlatList
          data={releases}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.releaseItem}>
              <Image 
                source={{ uri: item.thumb || 'https://picsum.photos/200' }} 
                style={styles.releaseThumb} 
              />
              <View style={styles.releaseInfo}>
                <Text style={styles.releaseTitle}>{item.title}</Text>
                <Text style={styles.releaseYear}>{item.year}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Bu sanatçıya ait albüm bulunamadı</Text>
          }
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  artistInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  artistImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  artistName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  artistBio: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  releaseItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  releaseThumb: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  releaseInfo: {
    flex: 1,
  },
  releaseTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  releaseYear: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
}); 