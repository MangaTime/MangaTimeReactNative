import React from 'react';
import { FlatList, Button, SafeAreaView, View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ReduxThunk from 'redux-thunk';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';

import { fetchUpdatedManga, fetchMangaDetail, Manga } from '../../redux/Manga/mangaReducer'
export const MangaList = () => {
  const recentlyUpdatedManga = useAppSelector((state) => state.mangaReducer.recentlyUpdatedManga)
  const dispatch = useAppDispatch();
  const updateMangaList = () => {
    dispatch(fetchUpdatedManga());
  };
  const getMangaDetail = (manga:Manga) => {
    dispatch(fetchMangaDetail(manga))
  }
  return (
    <SafeAreaView style={styles.container}>
      <Button onPress={updateMangaList} title="Update" />
      <FlatList
        style={styles.mangaList}
        data={recentlyUpdatedManga}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) =>
          <TouchableOpacity  activeOpacity={0.6} onPress={()=>{getMangaDetail(item)}}>
            <View style={styles.item}>
              <Image
                resizeMode="contain"
                style={styles.thumbnail}
                source={{
                  uri: `https://uploads.mangadex.org/covers/${item.id}/${item.cover_art}.256.jpg`,
                }}
              />
              <Text style={styles.mangaName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        }
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: { width: "100%" },
  mangaList: {
    borderWidth: 1,
    borderColor: "black"
  },
  item: {
    flexDirection: 'row',
    width: "100%",
    padding: 5
  },
  mangaName: {
    width: "80%"
  },
  thumbnail: {
    width: "20%",
    height: 75,
  }
});
