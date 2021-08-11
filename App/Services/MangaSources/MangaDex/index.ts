import { BaseMangaSource } from '../baseMangaSource';
import { mangaRequests } from './manga';
import { userRequests } from './user';

export const MangaDexSource: BaseMangaSource = {
  manga: mangaRequests,
  user: userRequests,
};
