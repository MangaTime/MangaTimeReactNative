import { Button, SafeAreaView, StyleSheet } from 'react-native';
import { AuthForm } from '../../Components/AuthForm';
import { LargeMangaList } from '../../Components/MangaList/LargeMangaList';
import { SmallMangaList } from '../../Components/MangaList/SmallMangaList';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import {
  fetchMangaDetail,
  fetchUpdatedManga,
} from '../../redux/Manga/mangaReducer';
import { Manga } from '../../redux/Manga/interfaces';
import { useEffect } from 'react';
import { HomeStackParamList } from '../../Navigator/HomeStack/paramList';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  fetchFollowingManga,
  popFirstChapterFeed,
} from '../../redux/Manga/mangaPersistReducer';

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export const Home = ({ navigation }: Props) => {
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
    dispatch(fetchFollowingManga());
  };
  const getMangaDetail = (manga: Manga) => {
    dispatch(fetchMangaDetail(manga));
    navigation.navigate('MangaDetail', { manga });
  };
  return (
    <SafeAreaView style={styles.container}>
      <AuthForm />
      <Button onPress={() => dispatch(popFirstChapterFeed())} title="Pop" />
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
