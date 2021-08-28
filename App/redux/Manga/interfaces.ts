import SupportedSources from '../../Services/MangaSources/supportedSources';

export interface MangaSourceInfo {
  [key: string]: string[] | string | undefined;
}

export interface Chapter {
  type: 'chapter';
  sourceInfo: {
    [key in keyof SupportedSources]?: MangaSourceInfo;
  };
  // id: string; // obsolete
  updatedAt: string;
  name: string;
  // hash: string;
  // pages?: string[];
  volume?: string;
  manga?: Manga;
  // manga?: string | Manga;
  title?: string;
}
// export interface Volume {
//   name: string;
//   chapters?: (Chapter | string)[];
// }
export interface Manga {
  type: 'manga';
  sourceInfo: {
    [key in keyof SupportedSources]?: MangaSourceInfo;
  };
  // id: string; // obsolete
  names: string[];
  // alternative_names: string[];
  description: string;
  author: string;
  artist: string;
  genres: string[];
  themes: string[];
  demographic: string[];
  cover_art: string;
  // volumes?: Volume[];
  chapters?: Chapter[];
}
