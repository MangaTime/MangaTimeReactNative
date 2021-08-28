export interface Chapter {
  id: string;
  updatedAt: string;
  name: string;
  hash: string;
  pages?: string[];
  volume?: string;
  manga?: string | Manga;
  title?: string;
}
export interface Volume {
  name: string;
  chapters?: (Chapter | string)[];
}
export interface Manga {
  id: string;
  name: string;
  alternative_names: string[];
  description: string;
  author: string;
  artist: string;
  genres: string[];
  themes: string[];
  demographic: string[];
  cover_art: string;
  volumes?: Volume[];
  chapters?: Chapter[];
}
export interface MangaPersistState {
  followingFeed?: Chapter[];
  followingManga?: Manga[];
}
export interface MangaState {
  recentlyUpdatedManga?: Manga[];
  recentlyAddedManga?: Manga[];
  randomManga?: Manga[];
  mangaDetail?: Manga;
  readingChapter?: Chapter;
  baseUrl?: string;
}
