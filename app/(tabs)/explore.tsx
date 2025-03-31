import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import Label from '@/components/Label';
import Input from '@/components/Input';
import { discogsApi } from '@/services/discogs-api';
import { router } from 'expo-router';

// Sanatçı tipi tanımı
interface Artist {
  id: number;
  title: string;
  thumb: string; // thumbnail resim URL'si
  resource_url: string;
}

export default function ExploreScreen() {
  const [search, setSearch] = useState('');
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Arama işlemi
  const handleSearch = async () => {
    if (!search.trim()) return;

    setLoading(true);
    setError(null);
    
    try {
      const result = await discogsApi.searchArtists(search);
      setArtists(result.results);
    } catch (err) {
      setError('Arama sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Sanatçı seçildiğinde yapılacak işlem
  const handleSelectArtist = (artist: Artist) => {
    // Burada sanatçıya tıklandığında sanatçı detayları veya albümleri sayfasına yönlendirme yapabilirsiniz
    console.log('Seçilen sanatçı:', artist);
    router.push(`/artist/${artist.id}`);
  };

  return (
    <View style={styles.container}>
      <Label label="Search artists, songs, albums, and more..." />
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
          style={{ flex: 1 }}
        />
        <TouchableOpacity 
          style={styles.searchButton} 
          onPress={handleSearch}
          disabled={loading}
        >
          <Text style={styles.searchButtonText}>Ara</Text>
        </TouchableOpacity>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
      
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <FlatList
          data={artists}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.artistItem}
              onPress={() => handleSelectArtist(item)}
            >
              <Image 
                source={{ uri: item.thumb || 'https://via.placeholder.com/50' }} 
                style={styles.artistThumb} 
              />
              <Text style={styles.artistName}>{item.title}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            !loading && search.trim() ? (
              <Text style={styles.emptyText}>Sonuç bulunamadı</Text>
            ) : null
          }
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchButton: {
    backgroundColor: '#6200ee',
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  artistItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  artistThumb: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  artistName: {
    fontSize: 16,
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});