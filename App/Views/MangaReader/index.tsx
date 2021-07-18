import { ReactElement, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
  Button,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import {
  fetchMangadexHomeBaseUrl,
  loadChapter,
} from '../../redux/Manga/mangaReducer';

export const MangaReader = (): ReactElement => {
  const dispatch = useAppDispatch();
  const mangaDetail = useAppSelector((state) => state.mangaReducer.mangaDetail);
  const chapterDetail = useAppSelector(
    (state) => state.mangaReducer.readingChapter,
  );
  const baseUrl = useAppSelector((state) => state.mangaReducer.baseUrl);
  useEffect(() => {
    (async () => {
      if (chapterDetail)
        await dispatch(fetchMangadexHomeBaseUrl(chapterDetail));
    })();
  }, [chapterDetail, dispatch]);

  const previousChapter = (shouldNavigate = false): boolean => {
    if (mangaDetail && mangaDetail.chapters && chapterDetail)
      for (let i = 0; i < mangaDetail.chapters.length; i++)
        if (
          parseFloat(mangaDetail.chapters[i].name) <
          parseFloat(chapterDetail.name)
        ) {
          if (shouldNavigate) dispatch(loadChapter(mangaDetail.chapters[i]));
          return true;
        }

    return false;
  };

  const nextChapter = (shouldNavigate = false): boolean => {
    if (mangaDetail && mangaDetail.chapters && chapterDetail)
      for (let i = mangaDetail.chapters.length - 1; i >= 0; i--)
        if (
          parseFloat(mangaDetail.chapters[i].name) >
          parseFloat(chapterDetail.name)
        ) {
          if (shouldNavigate) dispatch(loadChapter(mangaDetail.chapters[i]));
          return true;
        }

    return false;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Next chapter"
        disabled={!nextChapter()}
        onPress={() => nextChapter(true)}
      />
      <Button
        title="Previous chapter"
        disabled={!previousChapter()}
        onPress={() => previousChapter(true)}
      />
      <FlatList
        data={chapterDetail?.pages}
        keyExtractor={(page) => page}
        renderItem={(page) => (
          <Image
            accessibilityIgnoresInvertColors
            resizeMode="contain"
            style={styles.mangaPage}
            source={{
              uri: `${baseUrl}/data/${chapterDetail?.hash}/${page.item}`,
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {},
  mangaPage: {
    width: '100%',
    aspectRatio: 0.7,
  },
});
