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

import { Button, useTheme } from 'react-native-paper';
import { Manga } from '../../../redux/Manga/interfaces';

export interface MangaListProps {
  mangaList: Manga[] | undefined;
  itemCallback: (arg: Manga) => void;
  title: string;
  btnMoreCallback?: () => void;
}
export const SmallMangaList = ({
  mangaList,
  itemCallback,
  title = 'Manga List',
  btnMoreCallback = undefined,
}: MangaListProps): ReactElement => {
  const { colors, dark } = useTheme();
  const BtnMore = () =>
    btnMoreCallback ? (
      <Button
        mode="outlined"
        color={colors.text}
        onPress={() => console.log('aaa')}>
        More
      </Button>
    ) : (
      <></>
    );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={{ ...styles.titleText, color: colors.text }}>
            {title}
          </Text>
        </View>
        <View style={styles.headerRight}>
          <BtnMore />
        </View>
      </View>
      <FlatList
        horizontal
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
              <Text style={{ ...styles.mangaName, color: colors.text }}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: { width: '100%', height: 350 },
  titleText: { fontSize: 20, paddingBottom: 10, paddingLeft: 10 },
  header: { flexDirection: 'row' },
  headerLeft: { flex: 4 },
  headerRight: { flex: 1 },
  mangaList: {
    flexDirection: 'row',
    // borderWidth: 1,
  },
  btnMore: {},
  item: {
    flexDirection: 'column',
    height: 350,
    width: 180,
    padding: 5,
  },
  mangaName: {
    height: '100%',
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 0.7,
  },
});
