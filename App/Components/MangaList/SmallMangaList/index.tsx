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
import { IconButton, useTheme } from 'react-native-paper';
import { Manga } from '../../../redux/Manga/interfaces';

export interface MangaListProps {
  mangaList: Manga[];
  itemCallback: (arg: Manga) => void;
  title?: string;
  btnMoreCallback?: () => void;
}

export const SmallMangaList = ({
  mangaList,
  itemCallback,
  title = 'Manga List',
  btnMoreCallback = undefined,
}: MangaListProps): ReactElement => {
  const { colors, dark } = useTheme();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={{ ...styles.titleText, color: colors.text }}>
            {title}
          </Text>
        </View>
        <View style={styles.headerRight}>
          {btnMoreCallback && (
            <IconButton
              icon="chevron-triple-right"
              color={colors.text}
              style={{ backgroundColor: colors.background }}
              onPress={() => console.log('aaa')}
            />
          )}
        </View>
      </View>
      <FlatList
        horizontal
        style={styles.mangaList}
        data={mangaList}
        keyExtractor={(item) => item.id}
        snapToInterval={180}
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
  titleText: { fontSize: 20, paddingTop: 10 },
  header: { flexDirection: 'row', paddingLeft: 10 },
  headerLeft: { flex: 4 },
  headerRight: { flex: 1, alignItems: 'flex-end' },
  mangaList: {
    flexDirection: 'row',
  },
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
