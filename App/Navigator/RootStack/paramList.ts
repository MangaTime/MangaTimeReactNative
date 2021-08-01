import { Manga } from '../../redux/Manga/interfaces';

export type RootStackParamList = {
  MainTabs: undefined;
  ListMangaView: {
    routeName: string;
    routeId: string;
  };
  MangaDetail: {
    manga: Manga;
  };
  MangaReader: undefined;
};
