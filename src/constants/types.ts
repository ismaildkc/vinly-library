export interface IArtistSearh {
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
  type: 'artist' | 'master' | 'release' | 'label'
  year?: string;
}

export interface ILibraryItem {
  id?: string;
  userId: string; // Kullanıcıya özel kayıtlar için
  createdAt: Date | string;
  type: 'master' | 'release' | 'label';

  discogs_id: number;
  year: number;
  resource_url: string;
  uri: string;
  genres: string[];
  images: Image[];
  styles: string[];
  title: string;
  artists: Artist[];
  tracklist: Tracklist[];
  num_for_sale: number;
  lowest_price: number;
  data_quality: string;

  thumb?: string;
  labels?: Label[];
  series?: any[];
  companies?: Company[];
  formats?: Format[];
  country?: string;
  notes?: string;
}

// DISCOGS API TYPES
// getArtistReleases
export interface IGetArtistReleases {
  pagination: IPagination;
  releases: IRelease[];
}

export interface IPagination {
  page: number;
  pages: number;
  per_page: number;
  items: number;
  urls: IUrls;
}

export interface IUrls {
  last: string;
  next: string;
}

export interface IRelease {
  id: number;
  status?: string;
  type?: "master" | "release";
  format?: string;
  label?: string;
  title: string;
  resource_url: string;
  role?: string;
  artist: string;
  year: number;
  thumb: string;
  stats?: IStats;
  main_release?: number;
  isExist?: boolean;
}

export interface IStats {
  community: ICommunity;
  user: IUser;
}

export interface ICommunity {
  in_wantlist: number;
  in_collection: number;
}

export interface IUser {
  in_wantlist: number;
  in_collection: number;
}

// #######################
export interface IGetMasterDetails {
  id: number;
  main_release: number;
  most_recent_release: number;
  resource_url: string;
  uri: string;
  versions_url: string;
  main_release_url: string;
  most_recent_release_url: string;
  num_for_sale: number;
  lowest_price: number;
  images: Image[];
  genres: string[];
  styles: string[];
  year: number;
  tracklist: Tracklist[];
  artists: Artist[];
  title: string;
  data_quality: string;
}

export interface Image {
  type: string;
  uri: string;
  resource_url: string;
  uri150: string;
  width: number;
  height: number;
}

export interface Tracklist {
  position: string;
  type_: string;
  title: string;
  duration: string;
  extraartists?: Extraartist[];
}

export interface Extraartist {
  name: string;
  anv: string;
  join: string;
  role: string;
  tracks: string;
  id: number;
  resource_url: string;
}
// #######################

export interface IGetReleaseDetails {
  id: number;
  status: string;
  year: number;
  resource_url: string;
  uri: string;
  artists: Artist[];
  artists_sort: string;
  labels: Label[];
  series: any[];
  companies: Company[];
  formats: Format[];
  data_quality: string;
  community: Community;
  format_quantity: number;
  date_added: string;
  date_changed: string;
  num_for_sale: number;
  lowest_price: any;
  title: string;
  country: string;
  released: string;
  notes: string;
  released_formatted: string;
  identifiers: any[];
  videos: any[];
  genres: string[];
  styles: string[];
  tracklist: Tracklist[];
  extraartists: Extraartist[];
  images: Image[];
  thumb: string;
  estimated_weight: number;
  blocked_from_sale: boolean;
  is_offensive: boolean;
}

export interface Artist {
  name: string;
  anv: string;
  join: string;
  role: string;
  tracks: string;
  id: number;
  resource_url: string;
  thumbnail_url: string;
}

export interface Label {
  name: string;
  catno: string;
  entity_type: string;
  entity_type_name: string;
  id: number;
  resource_url: string;
  thumbnail_url: string;
}

export interface Company {
  name: string;
  catno: string;
  entity_type: string;
  entity_type_name: string;
  id: number;
  resource_url: string;
  thumbnail_url?: string;
}

export interface Format {
  name: string;
  qty: string;
  descriptions: string[];
}

export interface Community {
  have: number;
  want: number;
  rating: Rating;
  submitter: any;
  contributors: any[];
  data_quality: string;
  status: string;
}

export interface Rating {
  count: number;
  average: number;
}

export interface Tracklist {
  position: string;
  type_: string;
  title: string;
  duration: string;
  extraartists?: Extraartist[];
}

export interface Image {
  type: string;
  uri: string;
  resource_url: string;
  uri150: string;
  width: number;
  height: number;
}

// #######################

// #DISCOGS API TYPE
