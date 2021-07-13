import { Manga } from '../../redux/Manga/interfaces';

export type HomeStackParamList = {
  Home: undefined;
  MangaDetail: {
    manga: Manga;
  };
  MangaReader: undefined;
};
