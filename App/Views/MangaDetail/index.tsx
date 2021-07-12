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
import { HomeStackParamList } from '../../Navigator/HomeStack';
import { ChapterList } from '../../Components/ChapterList';

type ProfileScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'MangaDetail'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export const MangaDetail = ({ navigation }: Props): ReactElement => {
  const dispatch = useAppDispatch();
  const mangaDetail = useAppSelector((state) => state.mangaReducer.mangaDetail);
  if (mangaDetail) {
    return (
      <SafeAreaView style={styles.container}>
        <Image
          accessibilityIgnoresInvertColors
          resizeMode="contain"
          style={styles.thumbnail}
          source={{
            uri: `https://uploads.mangadex.org/covers/${mangaDetail.id}/${mangaDetail.cover_art}.256.jpg`,
          }}
        />
        <Text style={styles.mangaName}>{mangaDetail.name}</Text>
        <FlatList
          data={mangaDetail.volumes}
          keyExtractor={(vol) => vol.name}
          renderItem={(vol) => (
            <View>
              <Text>Volume {vol.item.name}</Text>
              <ChapterList
                volume={vol.item}
                itemCallback={() => navigation.navigate('MangaReader')}
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
  container: {},
  mangaName: {
    width: '100%',
  },
  thumbnail: {
    width: '100%',
    height: '50%',
  },
});
