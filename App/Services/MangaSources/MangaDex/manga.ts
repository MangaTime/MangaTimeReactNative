import { Chapter, Manga } from '../../../redux/Manga/interfaces';
import client from './client';
import { components } from './mangadex';
import { BaseMangaRequests } from '../baseMangaSource';
import { wait } from '../../utils';

const APIMangaListToLocalMangaList = (
  apiResponse: components['schemas']['MangaList'],
): Manga[] => {
  const result = apiResponse?.data?.map((e) => {
    const item: Manga = {
      type: 'manga',
      sourceInfo: {
        MangaDex: {
          id: e?.id,
        },
      },
      // id: e.data?.id, // obsolete
      names: [
        e?.attributes?.title?.en ?? '',
        ...(e?.attributes?.altTitles
          ?.map((e1): string[] => Object.values(e1))
          .reduce((x, y) => x.concat(y), []) ?? []),
      ].filter((e) => e !== ''),
      description: e?.attributes?.description?.en ?? '',
      author: e.relationships?.find((e1) => e1.type === 'author')?.attributes
        ?.name as string,
      artist: e.relationships?.find((e1) => e1.type === 'artist')?.attributes
        ?.name as string,
      genres:
        e?.attributes?.tags
          ?.filter((e1) => e1.attributes?.group === 'genre')
          .map((e1) => e1.attributes?.name?.en ?? '') ?? [],
      themes:
        e?.attributes?.tags
          ?.filter((e1) => e1.attributes?.group === 'theme')
          .map((e1) => e1.attributes?.name?.en ?? '') ?? [],
      demographic:
        e?.attributes?.tags
          ?.filter((e1) => e1.attributes?.group === 'format')
          .map((e1) => e1.attributes?.name?.en ?? '') ?? [],
      cover_art: e.relationships?.find((e1) => e1.type === 'cover_art')
        ?.attributes?.fileName as string,
    };
    item.cover_art = `https://uploads.mangadex.org/covers/${item.sourceInfo.MangaDex?.id}/${item.cover_art}.256.jpg`;
    return item;
  });
  return result ?? [];
};

const generatePageUrls = async (chapter: Chapter) => {
  const defaultChapterInfo = chapter.sourceInfo.find(
    (e) => e.MangaDex,
  )?.MangaDex;
  let baseUrl = (
    (await client.get(`/at-home/server/${defaultChapterInfo?.id}`)) as {
      baseUrl: string;
    }
  ).baseUrl;
  return (defaultChapterInfo?.pages as string[]).map(
    (e) => `${baseUrl}/data/${defaultChapterInfo?.hash}/${e}`,
  );
};
const APIChapterListToLocalChapterList = (
  apiResponse: components['schemas']['ChapterList'],
): Chapter[] => {
  const chapterList =
    apiResponse?.data?.map((item): Chapter => {
      const chapter: Chapter = {
        type: 'chapter',
        sourceInfo: [
          {
            MangaDex: {
              id: item?.id,
              hash: item?.attributes?.hash ?? '',
              pages: item?.attributes?.data ?? [],
              manga: item.relationships?.find((e) => e.type === 'manga')?.id,
            },
          },
        ],
        // id: item.data?.id,
        updatedAt: item?.attributes?.updatedAt ?? '',
        name: item?.attributes?.chapter ?? 'unknown',
        volume: item?.attributes?.volume ?? undefined,
        title: item?.attributes?.title,
      };
      return chapter;
    }) ?? [];
  const chapterListWithoutDuplicates: Chapter[] = [];
  for (const chapter of chapterList) {
    const existingChapter = chapterListWithoutDuplicates.find(
      (e) => e.name === chapter.name,
    );
    if (existingChapter) {
      existingChapter.sourceInfo.push(chapter.sourceInfo[0]);
    } else {
      chapterListWithoutDuplicates.push(chapter);
    }
  }
  return chapterListWithoutDuplicates ?? [];
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
      data: [],
    } as components['schemas']['MangaList'];
    for (let i = 0; i < limit; i++) {
      // eslint-disable-next-line no-await-in-loop
      const randomManga = (await client.get(
        `/manga/random?includes[]=cover_art`,
      )) as components['schemas']['MangaResponse'];
      if (result && result.data)
        if (!result.data.find((e) => e?.id === randomManga.data?.id))
          result.data.push(randomManga.data as components['schemas']['Manga']);
      // eslint-disable-next-line no-await-in-loop
      await wait(1000);
    }
    return APIMangaListToLocalMangaList(
      result as components['schemas']['MangaList'],
    );
  },
  async getMangaDetail(manga: Manga): Promise<Manga> {
    return client
      .get(
        `/manga/${manga.sourceInfo['MangaDex']?.id}/feed?translatedLanguage[]=en&limit=500&order[chapter]=desc`,
      )
      .then(async (response) => {
        const mangaDetail = { ...manga };
        const chapters = APIChapterListToLocalChapterList(
          response as components['schemas']['ChapterList'],
        );
        // mangaDetail.volumes = volumes;
        mangaDetail.chapters = chapters;
        return mangaDetail;
      });
  },
  async loadChapter(chapter: Chapter): Promise<string[]> {
    return generatePageUrls(chapter);
  },
  async getFollowingManga(offset: number, limit: number): Promise<Manga[]> {
    // first get the following list
    const result = (await client.get(
      `/user/follows/manga?limit=${limit}&offset=${offset}`,
    )) as components['schemas']['MangaList'];
    // extract manga ids
    const mangaIds = result.data?.map((e) => e?.id);
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