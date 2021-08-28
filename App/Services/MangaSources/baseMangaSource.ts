import { ActionCreatorWithPayload, EnhancedStore } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Chapter, Manga } from '../../redux/Manga/interfaces';
import {
  LoginInformation,
  ServiceAuthenticationInformation,
} from '../../redux/User/interfaces';

export interface BaseMangaRequests {
  getUpdatedManga?: (offset: number, limit: number) => Promise<Manga[]>;
  getAddedManga?: (offset: number, limit: number) => Promise<Manga[]>;
  getRandomManga?: (limit: number) => Promise<Manga[]>;
  getMangaDetail?: (manga: Manga) => Promise<Manga>;
  loadChapter: (chapter:Chapter) => Promise<string[]>;
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
  ) => Promise<ServiceAuthenticationInformation | undefined>;
  logout?: () => Promise<unknown>; 
}
export interface BaseClient{
  client: AxiosInstance,
  clientInterceptor?:(
    client: AxiosInstance,
    store: EnhancedStore,
    updateStateFunction: ActionCreatorWithPayload<any, string>
  ) => void;
}
export interface BaseMangaSource {
  manga: BaseMangaRequests;
  user: BaseUserRequests;
  client: BaseClient;
}
