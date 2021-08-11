import {
  Chapter,
  Manga,
  // Volume
} from '../../../redux/Manga/interfaces';
import client from '../../baseClient';
import { components } from './mangadex';
import { BaseMangaRequests, BaseMangaSource } from '../baseMangaSource';
import { wait } from '../../utils';

const APIMangaListToLocalMangaList = (
  apiResponse: components['schemas']['MangaList'],
): Manga[] => {
  const result = apiResponse?.results?.map((e) => {
    const item: Manga = {
      sourceInfo: {
        MangaDex: {
          id: e.data?.id,
        },
      },
      // id: e.data?.id, // obsolete
      name: e.data?.attributes?.title?.en ?? '', // get only english title and description for now
      alternative_names:
        e.data?.attributes?.altTitles
          ?.map((e1): string[] => Object.values(e1))
          .reduce((x, y) => x.concat(y), []) ?? [],
      description: e.data?.attributes?.description?.en ?? '',
      author: e.relationships?.find((e1) => e1.type === 'author')?.attributes
        ?.name as string,
      artist: e.relationships?.find((e1) => e1.type === 'artist')?.attributes
        ?.name as string,
      genres:
        e.data?.attributes?.tags
          ?.filter((e1) => e1.attributes?.group === 'genre')
          .map((e1) => e1.attributes?.name?.en ?? '') ?? [],
      themes:
        e.data?.attributes?.tags
          ?.filter((e1) => e1.attributes?.group === 'theme')
          .map((e1) => e1.attributes?.name?.en ?? '') ?? [],
      demographic:
        e.data?.attributes?.tags
          ?.filter((e1) => e1.attributes?.group === 'format')
          .map((e1) => e1.attributes?.name?.en ?? '') ?? [],
      cover_art: e.relationships?.find((e1) => e1.type === 'cover_art')
        ?.attributes?.fileName,
    };
    return item;
  });
  return result ?? [];
};

const APIChapterListToLocalChapterList = (
  apiResponse: components['schemas']['ChapterList'],
): Chapter[] => {
  return (
    apiResponse?.results?.map((item): Chapter => {
      const chapter: Chapter = {
        sourceInfo: {
          MangaDex: {
            id: item.data?.id,
            hash: item.data?.attributes?.hash ?? '',
            pages: item.data?.attributes?.data ?? [],
            manga: item.relationships?.find((e) => e.type === 'manga')?.id,
          },
        },
        // id: item.data?.id,
        updatedAt: item.data?.attributes?.updatedAt ?? '',
        name: item.data?.attributes?.chapter ?? '',
        volume: item.data?.attributes?.volume ?? '',
        title: item.data?.attributes?.title,
      };
      return chapter;
    }) ?? []
  );
};

export const mangaRequests: BaseMangaRequests = {
  async getUpdatedManga(offset = 0, limit = 100): Promise<Manga[]> {
    return client
      .get(
        `/manga?limit=${limit}&offset=${offset}&order[updatedAt]=desc&includes[]=cover_art&includes[]=author&includes[]=artist`,
      )
      .then((response) =>
        APIMangaListToLocalMangaList(
          response as components['schemas']['MangaList'],
        ),
      );
  },
  async getAddedManga(offset = 0, limit = 100): Promise<Manga[]> {
    return client
      .get(
        `/manga?limit=${limit}&offset=${offset}&order[createdAt]=desc&includes[]=cover_art&includes[]=author&includes[]=artist`,
      )
      .then((response) =>
        APIMangaListToLocalMangaList(
          response as components['schemas']['MangaList'],
        ),
      );
  },
  async getRandomManga(limit: number): Promise<Manga[]> {
    const result = {
      results: [],
    } as components['schemas']['MangaList'];
    for (let i = 0; i < limit; i++) {
      // eslint-disable-next-line no-await-in-loop
      const randomManga = (await client.get(
        `/manga/random?includes[]=cover_art`,
      )) as components['schemas']['MangaResponse'];
      if (result && result.results)
        if (!result.results.find((e) => e.data?.id === randomManga.data?.id))
          result.results.push(randomManga);
      // eslint-disable-next-line no-await-in-loop
      await wait(300);
    }
    return APIMangaListToLocalMangaList(
      result as components['schemas']['MangaList'],
    );
  },
  async getMangaDetail(manga: Manga): Promise<Manga> {
    return client
      .get(
        `/manga/${manga.sourceInfo['MangaDex'].id}/feed?translatedLanguage[]=en&limit=500&order[chapter]=desc`,
      )
      .then((response) => {
        const mangaDetail = { ...manga };
        // const volumes: Volume[] = [];
        // const chapters: Chapter[] = [];
        // (response as components['schemas']['ChapterList']).results?.forEach(
        //   (item) => {
        // const volumeName = item.data?.attributes?.volume ?? 'unknown';
        // let volume: Volume | undefined = volumes.find(
        //   (v) => v.name === volumeName,
        // );
        // if (!volume) {
        //   volume = {
        //     name: volumeName,
        //     chapters: [],
        //   };
        //   volumes.push(volume);
        // }
        //     const chapter: Chapter = {
        //       name: item.data?.attributes?.chapter ?? 'unknown',
        //       id: item.data?.id ?? 'unknown',
        //       updatedAt: item.data?.attributes?.updatedAt ?? 'unknown',
        //       hash: item.data?.attributes?.hash ?? '',
        //       title: item.data?.attributes?.title,
        //       pages: item.data?.attributes?.data,
        //       volume: volume.name,
        //       manga: mangaDetail.sourceInfo['MangaDex'].id,
        //     };
        //     // if (!volume.chapters) volume.chapters = [];
        //     // volume.chapters.push(chapter);
        //     chapters.push(chapter);
        //   },
        // );
        const chapters = APIChapterListToLocalChapterList(
          response as components['schemas']['ChapterList'],
        );
        // mangaDetail.volumes = volumes;
        mangaDetail.chapters = chapters;
        return mangaDetail;
      });
  },
  async getFollowingManga(offset: number, limit: number): Promise<Manga[]> {
    // first get the following list
    const result = (await client.get(
      `/user/follows/manga?limit=${limit}&offset=${offset}`,
    )) as components['schemas']['MangaList'];
    // extract manga ids
    const mangaIds = result.results?.map((e) => e.data?.id);
    return client
      .get(
        `/manga?${mangaIds
          ?.map((e) => `ids[]=${e}`)
          .join(
            '&',
          )}&limit=100&offset=0&includes[]=cover_art&includes[]=author&includes[]=artist`,
      )
      .then((response) =>
        APIMangaListToLocalMangaList(
          response as components['schemas']['MangaList'],
        ),
      );
  },
  async getAllFollowingManga(): Promise<Manga[]> {
    let result: Manga[] = [];
    let offset = 0;
    const limit = 100;
    if (this.getFollowingManga) {
      while (true) {
        // eslint-disable-next-line no-await-in-loop
        const lastFetched = await this.getFollowingManga(offset, limit);
        result = result.concat(lastFetched);
        if (lastFetched.length < limit) {
          return result;
        }
        offset += limit;
        // eslint-disable-next-line no-await-in-loop
        await wait(300);
      }
    } else return [];
  },
  async getFollowingChapterFeed(): Promise<Chapter[]> {
    return client
      .get(
        '/user/follows/manga/feed?order[publishAt]=desc&translatedLanguage[]=en',
      )
      .then((response) =>
        APIChapterListToLocalChapterList(
          response as components['schemas']['ChapterList'],
        ),
      );
  },
  async searchManga(
    limit: number,
    offset: number,
    title?: string,
    author?: string,
    artist?: string,
  ): Promise<Manga[]> {
    return client
      .get(
        `/manga?limit=${limit}&offset=${offset}&
        ${title ? `title=${title}&` : ''}
        ${author ? `author=${author}&` : ''}
        ${artist ? `artist=${artist}&` : ''}
        includes[]=cover_art&includes[]=author&includes[]=artist`,
      )
      .then((response) =>
        APIMangaListToLocalMangaList(
          response as components['schemas']['MangaList'],
        ),
      );
  },
};
