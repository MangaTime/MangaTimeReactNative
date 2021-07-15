import client from './baseClient';
import { components } from './mangadex';

const wait = async (duration: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, duration));
};
export const getUpdatedManga = async (
  offset = 0,
  limit = 100,
): Promise<components['schemas']['MangaList']> => {
  return client.get(
    `/manga?limit=${limit}&offset=${offset}&order[updatedAt]=desc&includes[]=cover_art`,
  );
};

export const getAddedManga = async (
  offset = 0,
  limit = 100,
): Promise<components['schemas']['MangaList']> => {
  return client.get(
    `/manga?limit=${limit}&offset=${offset}&order[createdAt]=desc&includes[]=cover_art`,
  );
};

export const getRandomManga = async (
  limit = 5,
): Promise<components['schemas']['MangaList']> => {
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
  return result;
};

export const getMangadexHomeBaseUrl = async (
  chapterId: string,
): Promise<{ baseUrl?: string }> => {
  return client.get(`/at-home/server/${chapterId}`);
};

export const getMangaDetail = async (
  id: string,
): Promise<components['schemas']['ChapterList']> => {
  return client.get(
    `/manga/${id}/feed?translatedLanguage[]=en&limit=500&order[chapter]=desc`,
  );
};

export const getFollowingManga = async (
  offset = 0,
  limit = 100,
): Promise<components['schemas']['MangaList']> => {
  // first get the following list
  const result = (await client.get(
    `/user/follows/manga?limit=${limit}&offset=${offset}`,
  )) as components['schemas']['MangaList'];
  // extract the covers' ids
  const coverIds = result.results?.map(
    (e) => e?.relationships?.find((e1) => e1.type === 'cover_art')?.id,
  );
  // get covers' full information (including filenames)
  const coversResponse = (await client.get(
    `/cover?limit=${limit}&${coverIds?.map((e) => `ids[]=${e}`).join('&')}`,
  )) as components['schemas']['CoverList'];
  const coversList = coversResponse.results?.map((e) => e.data);
  // insert the covers' full information to the original result object at the correct places
  result.results?.forEach((e) => {
    const ele = e;
    const coverId = ele.relationships?.find(
      (e1) => e1.type === 'cover_art',
    )?.id;
    if (ele.relationships) {
      const otherRelationship = ele.relationships.filter(
        (e1) => e1.type !== 'cover_art',
      );
      const cover = coversList?.find((e1) => e1?.id === coverId);
      ele.relationships = [...otherRelationship];
      if (cover) ele.relationships.push(cover);
    }
  });
  return result;
};

export const getAllFollowingManga = async (): Promise<
  components['schemas']['MangaList']
> => {
  let result: components['schemas']['MangaList'] | undefined;
  let offset = 0;
  const limit = 100;
  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const lastFetched = await getFollowingManga(offset, limit);
    if (result && result.results) {
      const allResult = lastFetched.results
        ? result.results.concat(lastFetched.results)
        : result.results;
      result.results = allResult;
    } else {
      result = lastFetched;
    }
    if (!lastFetched.results || !lastFetched.limit) return result;
    if (lastFetched.results.length < lastFetched.limit) {
      return result;
    }
    offset += limit;
    // eslint-disable-next-line no-await-in-loop
    await wait(300);
  }
};

export const getFollowingChapterFeed = async (): Promise<
  components['schemas']['ChapterList']
> => {
  return client.get(
    '/user/follows/manga/feed?order[publishAt]=desc&translatedLanguage[]=en',
  );
};
