import { BaseMangaSource } from './baseMangaSource';
import { MangaDexSource } from './MangaDex';
import SupportedSources from './supportedSources'; 

export const MangaSources: {
  [key in keyof SupportedSources]: BaseMangaSource;
} = {
  MangaDex: MangaDexSource,
};
