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
import { useTheme } from 'react-native-paper';

import { Manga } from '../../../redux/Manga/interfaces';

export interface MangaListProps {
  mangaList: Manga[];
  itemCallback: (arg: Manga) => void;
  numberOfColumns?: number;
}
export const LargeMangaList = ({
  mangaList,
  itemCallback,
  numberOfColumns = 2,
}: MangaListProps): ReactElement => {
  const { colors, dark } = useTheme();
  return (
    // <SafeAreaView style={styles.container}>

    <FlatList
      style={{ ...styles.mangaList }}
      data={mangaList}
      numColumns={numberOfColumns}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{ ...styles.item, width: `${100 / numberOfColumns}%` }}
          activeOpacity={0.6}
          onPress={() => {
            itemCallback(item);
          }}>
          <Image
            resizeMode="contain"
            accessibilityIgnoresInvertColors
            style={styles.thumbnail}
            source={{
              uri: `https://uploads.mangadex.org/covers/${item.id}/${item.cover_art}.256.jpg`,
            }}
          />
          <Text
            style={{
              ...styles.mangaName,
              textShadowColor: !dark ? 'white' : 'black',
              backgroundColor: colors.backdrop,
              padding: 5,
              // opacity: 0.5,
              color: colors.text,
              fontSize: 18,
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
    />
    // </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: { width: '100%' },
  mangaList: {
    // borderWidth: 1,
    padding: 16,
  },
  item: {
    // backgroundColor: 'green',
    flexDirection: 'column',
    padding: 5,
    // margin: 5,
  },
  mangaName: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    textAlign: 'center',
    left: 5, /// same as item's margin
    textShadowRadius: 50,
  },
  thumbnail: {
    width: '100%',
    // position: 'absolute',
    // top: 0,
    height: 300,
    backgroundColor: 'white',
  },
});
