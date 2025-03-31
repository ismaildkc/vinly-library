import axios from 'axios';

// Discogs API URL ve kimlik bilgileri
const BASE_URL = 'https://api.discogs.com';
const USER_AGENT = 'VinlyLibrary/1.0'; // Discogs API, user-agent belirtmenizi ister

// API isteği yapılandırması
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'User-Agent': USER_AGENT,
    'Authorization': `Discogs token=${process.env.EXPO_PUBLIC_DISCOGS_API_TOKEN}`
  }
});

// API fonksiyonları
export const discogsApi = {
  // Sanatçı arama
  searchArtists: async (query: string) => {
    try {
      const response = await api.get('/database/search', {
        params: {
          q: query,
          type: 'artist'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Sanatçı arama hatası:', error);
      throw error;
    }
  },

  // Sanatçı detayları getirme
  getArtist: async (artistId: string) => {
    try {
      const response = await api.get(`/artists/${artistId}`);
      return response.data;
    } catch (error) {
      console.error('Sanatçı detayları getirme hatası:', error);
      throw error;
    }
  },

  // Sanatçının albümlerini getirme
  getArtistReleases: async (artistId: string, page = 1, perPage = 50) => {
    try {
      const response = await api.get(`/artists/${artistId}/releases`, {
        params: {
          page,
          per_page: perPage
        }
      });
      return response.data;
    } catch (error) {
      console.error('Sanatçı albümleri getirme hatası:', error);
      throw error;
    }
  },

  // Albüm detayları getirme
  getReleaseDetails: async (releaseId: string) => {
    try {
      const response = await api.get(`/releases/${releaseId}`);
      return response.data;
    } catch (error) {
      console.error('Albüm detayları getirme hatası:', error);
      throw error;
    }
  }
}; 