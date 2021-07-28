import { Manga } from '../../redux/Manga/interfaces';

export type HomeStackParamList = {
  Home: undefined;
  ListMangaView: {
    routeName: string;
    routeId: string;
  };
  MangaDetail: {
    manga: Manga;
  };
  MangaReader: undefined;
};
