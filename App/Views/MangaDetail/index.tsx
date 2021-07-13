import React, { ReactElement, ReactComponentElement } from 'react';

import {
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import { Chapter, Volume } from '../../redux/Manga/interfaces';
import { HomeStackParamList } from '../../Navigator/HomeStack/paramList';
import { ChapterList } from '../../Components/ChapterList';
import { loadChapter } from '../../redux/Manga/mangaReducer';

type MangaDetailScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'MangaDetail'
>;

type Props = {
  navigation: MangaDetailScreenNavigationProp;
};

export const MangaDetail = ({ navigation }: Props): ReactElement => {
  const dispatch = useAppDispatch();
  const mangaDetail = useAppSelector((state) => state.mangaReducer.mangaDetail);
  if (mangaDetail) {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          ListHeaderComponentStyle={{
            borderColor: 'red',
            borderWidth: 2,
            marginBottom: 0,
            paddingBottom: 0,
          }}
          ListHeaderComponent={
            <View
              style={{
                borderColor: 'black',
                borderWidth: 2,
                marginBottom: 0,
                paddingBottom: 0,
              }}>
              <Image
                accessibilityIgnoresInvertColors
                resizeMode="contain"
                style={styles.thumbnail}
                source={{
                  uri: `https://uploads.mangadex.org/covers/${mangaDetail.id}/${mangaDetail.cover_art}.256.jpg`,
                }}
              />
              <Text style={styles.mangaName}>{mangaDetail.name}</Text>
              <Text style={styles.mangaDescription}>
                {mangaDetail.description}
              </Text>
            </View>
          }
          data={mangaDetail.volumes}
          keyExtractor={(vol) => vol.name}
          renderItem={(vol) => (
            <View
              style={{
                borderColor: 'black',
                borderWidth: 2,
              }}>
              <Text>Volume {vol.item.name}</Text>
              <ChapterList
                volume={vol.item}
                itemCallback={(chapter: Chapter) => {
                  dispatch(loadChapter(chapter));
                  navigation.navigate('MangaReader');
                }}
              />
            </View>
          )}
        />
      </SafeAreaView>
    );
  } else
    return (
      <SafeAreaView style={styles.container}>
        <Text>Empty</Text>
      </SafeAreaView>
    );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  mangaName: {
    width: '100%',
    borderColor: 'black',
    borderWidth: 2,
  },
  mangaDescription: {
    width: '100%',
    borderColor: 'black',
    borderWidth: 2,
  },
  thumbnail: {
    width: '100%',
    // height: 500,
    aspectRatio: 1,
  },
});
