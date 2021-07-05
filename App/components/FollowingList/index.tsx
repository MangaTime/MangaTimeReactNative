import React from 'react';
import {
  FlatList,
  Button,
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';

import {
  fetchFollowingManga,
  fetchMangaDetail,
  Manga,
} from '../../redux/Manga/mangaReducer';

export const FollowingList = () => {
  const followingManga = useAppSelector(
    (state) => state.mangaReducer.followingManga,
  );
  const dispatch = useAppDispatch();
  const updateFollowingList = () => {
    dispatch(fetchFollowingManga());
  };
  const getMangaDetail = (manga: Manga) => {
    dispatch(fetchMangaDetail(manga));
  };
  return (
    <SafeAreaView style={styles.container}>
      <Button onPress={updateFollowingList} title="Update" />
      <FlatList
        style={styles.mangaList}
        data={followingManga}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              getMangaDetail(item);
            }}>
            <View style={styles.item}>
              <Image
                resizeMode="contain"
                accessibilityIgnoresInvertColors
                style={styles.thumbnail}
                source={{
                  uri: `https://uploads.mangadex.org/covers/${item.id}/${item.cover_art}.256.jpg`,
                }}
              />
              <Text style={styles.mangaName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: { width: '100%' },
  mangaList: {
    borderWidth: 1,
    borderColor: 'black',
  },
  item: {
    flexDirection: 'row',
    width: '100%',
    padding: 5,
  },
  mangaName: {
    width: '80%',
  },
  thumbnail: {
    width: '20%',
    height: 75,
  },
});
