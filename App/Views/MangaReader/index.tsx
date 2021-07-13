import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Button,
  Text,
  FlatList,
  Image,
} from 'react-native';
import { HomeStackParamList } from '../../Navigator/HomeStack/paramList';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import { fetchMangadexHomeBaseUrl } from '../../redux/Manga/mangaReducer';

type MangaReaderScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'MangaReader'
>;

type Props = {
  navigation: MangaReaderScreenNavigationProp;
};

export const MangaReader: React.FC = () => {
  const dispatch = useAppDispatch();
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

  return (
    <SafeAreaView style={styles.container}>
      <Text>Manga reader</Text>
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
