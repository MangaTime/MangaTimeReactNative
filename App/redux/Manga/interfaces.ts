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
  description: string;
  cover_art: string;
  volumes?: Volume[];
  chapters?: Chapter[];
}
