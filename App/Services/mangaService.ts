import client from './baseClient';
import { components } from './mangadex';

export const getUpdatedManga = async (): Promise<
  components['schemas']['MangaList']
> => {
  return client.get(
    '/manga?limit=3&order[updatedAt]=desc&includes[]=cover_art',
  );
};

export const getMangaDetail = async (
  id: string,
): Promise<components['schemas']['MangaDetail']> => {
  return client.get(`/manga/${id}/aggregate`);
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
    `/cover?${coverIds?.map((e) => `ids[]=${e}`).join('&')}`,
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
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
};

export const getFollowingChapterFeed = async (): Promise<
  components['schemas']['ChapterList']
> => {
  return client.get(
    '/user/follows/manga/feed?order[publishAt]=desc&translatedLanguage[]=en',
  );
};
