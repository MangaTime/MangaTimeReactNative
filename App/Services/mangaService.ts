import axios from 'axios';
import client from './baseClient';

export const getUpdatedManga = async () => {
  return client.get(
    '/manga?limit=10&order[updatedAt]=desc&includes[]=cover_art',
  );
};

export const getMangaDetail = async (id: string) => {
  return client.get(`/manga/${id}/aggregate`);
};

export const getFollowingManga = async () => {
  // first get the following list
  const result = await client.get('/user/follows/manga?limit=3');
  // extract the covers' ids
  const coverIds = (result.results as any[]).map(
    (e) => (e.relationships as any[]).find((e) => e.type == 'cover_art')?.id,
  );
  // get covers' full information (including filenames)
  const coversResponse = await client.get(
    `/cover?${coverIds.map((e, i, arr) => `ids[]=${e}`).join('&')}`,
  );
  const coversList = (coversResponse.results as any[]).map((e) => e.data);
  // insert the covers' full information to the original result object at the correct places
  (result.results as any[]).forEach((ele) => {
    const coverId = ele.relationships.find((e) => e.type == 'cover_art')?.id;
    ele.relationships = [
      ...ele.relationships.filter((e) => e.type != 'cover_art'),
      coversList.find((e) => e.id == coverId),
    ];
  });
  return result;
};
