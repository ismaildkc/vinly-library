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