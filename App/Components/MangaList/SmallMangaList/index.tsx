import React, { ReactElement } from 'react';

import {
  FlatList,
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { Manga } from '../../../redux/Manga/mangaReducer';

interface MangaListProps {
  mangaList: Manga[];
  itemCallback: (arg: Manga) => void;
}
export const SmallMangaList = ({
  mangaList,
  itemCallback,
}: MangaListProps): ReactElement => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>SMALL</Text>
      <FlatList
        style={styles.mangaList}
        data={mangaList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              itemCallback(item);
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
  container: { width: '100%', height: 100 },
  mangaList: {
    borderWidth: 1,
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
