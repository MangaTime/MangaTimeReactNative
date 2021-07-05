import axios from 'axios';
import client from './baseClient';

export const getUpdatedManga = async () => {
  return client.get(
    '/manga?limit=3&order[updatedAt]=desc&includes[]=cover_art',
  );
};

export const getMangaDetail = async (id: string) => {
  return client.get(`/manga/${id}/aggregate`);
};
