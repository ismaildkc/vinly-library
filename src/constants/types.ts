export interface IArtist {
  id: number;
  title: string;
  thumb: string;
  resource_url: string;
}

export interface ISearchResult {
  id: number;
  title: string;
  thumb: string;
  resource_url: string;
  type: string; // 'artist' | 'master' | 'release' | 'label'
  year?: string;
}

export interface ILibraryItem {
  name: string;
  image: string;
  discogs_id: number;
  discogs_uri: string;
  genres: string[];
  styles: string[];
  year: number;
  userId: string; // Kullanıcıya özel kayıtlar için
  createdAt: Date;
}