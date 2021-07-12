import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Button,
  ScrollView,
  FlatList,
} from 'react-native';
import { MangaDetail } from '../../Components/MangaDetail';
import { LargeMangaList } from '../../Components/MangaList/LargeMangaList';
import { AuthForm } from '../../Components/AuthForm';

import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import {
  fetchMangaDetail,
  fetchUpdatedManga,
} from '../../redux/Manga/mangaReducer';
import { Manga } from '../../redux/Manga/interfaces';
import { SmallMangaList } from '../../Components/MangaList/SmallMangaList';
import { fetchFollowingManga } from '../../redux/Manga/mangaPersistReducer';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const recentlyUpdatedManga = useAppSelector(
    (state) => state.mangaReducer.recentlyUpdatedManga,
  );
  // const recentlyAddedManga = useAppSelector(
  //   (state) => state.mangaReducer.recentlyAddedManga,
  // );
  const followingManga = useAppSelector(
    (state) => state.persist.manga.followingManga,
  );
  const updateMangaList = () => {
    dispatch(fetchUpdatedManga());
  };
  const getMangaDetail = (manga: Manga) => {
    dispatch(fetchMangaDetail(manga));
  };
  return (
    <SafeAreaView style={styles.container}>
      <AuthForm />
      <Button onPress={updateMangaList} title="Update" />
      <SmallMangaList
        mangaList={recentlyUpdatedManga}
        itemCallback={getMangaDetail}
      />
      <SmallMangaList
        mangaList={followingManga}
        itemCallback={getMangaDetail}
      />
      <LargeMangaList
        mangaList={recentlyUpdatedManga}
        itemCallback={getMangaDetail}
      />
      <MangaDetail />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {},
});
