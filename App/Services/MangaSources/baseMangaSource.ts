import { EnhancedStore } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Chapter, Manga } from '../../redux/Manga/interfaces';
import { RootState } from '../../redux/store';
import {
  AdditionalAuthenticationInformation,
  LoginInformation,
  ServiceAuthenticationInformation,
} from '../../redux/User/interfaces';
import SupportedSources from './supportedSources';

export interface BaseMangaRequests {
  getUpdatedManga?: (offset: number, limit: number) => Promise<Manga[]>;
  getAddedManga?: (offset: number, limit: number) => Promise<Manga[]>;
  getRandomManga?: (limit: number) => Promise<Manga[]>;
  getMangaDetail?: (manga: Manga) => Promise<Manga>;
  getFollowingManga?: (offset: number, limit: number) => Promise<Manga[]>;
  getAllFollowingManga?: () => Promise<Manga[]>;
  getFollowingChapterFeed: (followingManga: Manga[]) => Promise<Chapter[]>;
  searchManga?: (
    limit: number,
    offset: number,
    title?: string,
    author?: string,
    artist?: string,
  ) => Promise<Manga[]>;
}
export interface BaseUserRequests {
  login?: (
    loginInfo: LoginInformation,
  ) => Promise<ServiceAuthenticationInformation | undefined>; // TODO
  logout?: (service: keyof SupportedSources) => Promise<unknown>; // TODO
  // refreshToken?: () => Promise<void>; // TODO
  clientInterceptor?: (
    client: AxiosInstance,
    store: EnhancedStore<RootState>,
  ) => void;
}
export interface BaseMangaSource {
  manga: BaseMangaRequests;
  user: BaseUserRequests;
}
