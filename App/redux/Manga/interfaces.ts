export interface Chapter {
  id: string;
  updatedAt: string;
  name: string;
  pages?: string[];
  volume?: Volume | string;
  manga?: Manga | string;
  title?: string;
}
export interface Volume {
  name: string;
  chapters?: Chapter[] | string[];
}
export interface Manga {
  id: string;
  name: string;
  description: string;
  cover_art: string;
  volumes?: Volume[];
}
