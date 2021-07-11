import { Button, SafeAreaView, StyleSheet } from 'react-native';
import { AuthForm } from '../../Components/AuthForm';
import { MangaDetail } from '../../Components/MangaDetail';
import { LargeMangaList } from '../../Components/MangaList/LargeMangaList';
import { SmallMangaList } from '../../Components/MangaList/SmallMangaList';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import {
  fetchFollowingManga,
  fetchMangaDetail,
  fetchUpdatedManga,
  Manga,
} from '../../redux/Manga/mangaReducer';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const recentlyUpdatedManga = useAppSelector(
    (state) => state.mangaReducer.recentlyUpdatedManga,
  );
  // const recentlyAddedManga = useAppSelector(
  //   (state) => state.mangaReducer.recentlyAddedManga,
  // );
  const followingManga = useAppSelector(
    (state) => state.mangaReducer.followingManga,
  );
  const updateMangaList = () => {
    dispatch(fetchUpdatedManga());
    dispatch(fetchFollowingManga());
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
      {/* <SmallMangaList
        mangaList={followingManga}
        itemCallback={getMangaDetail}
      /> */}
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
