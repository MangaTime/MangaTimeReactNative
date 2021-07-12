import React from 'react';
import { SafeAreaView, StyleSheet, Button } from 'react-native';
import { LargeMangaList } from '../../Components/MangaList/LargeMangaList';
import { AuthForm } from '../../Components/AuthForm';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import {
  fetchMangaDetail,
  fetchUpdatedManga,
} from '../../redux/Manga/mangaReducer';
import { Manga } from '../../redux/Manga/interfaces';
import { SmallMangaList } from '../../Components/MangaList/SmallMangaList';
import { useEffect } from 'react';

export const Home = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const recentlyUpdatedManga = useAppSelector(
    (state) => state.mangaReducer.recentlyUpdatedManga,
  );
  // const recentlyAddedManga = useAppSelector(
  //   (state) => state.mangaReducer.recentlyAddedManga,
  // );
  useEffect(() => {
    dispatch(fetchUpdatedManga());
  }, []);
  const followingManga = useAppSelector(
    (state) => state.persist.manga.followingManga,
  );
  const updateMangaList = () => {
    dispatch(fetchUpdatedManga());
  };
  const getMangaDetail = (manga: Manga) => {
    dispatch(fetchMangaDetail(manga));
    navigation.navigate('MangaDetail');
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
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {},
});
