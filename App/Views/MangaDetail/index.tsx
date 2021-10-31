import { ReactElement, useEffect } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import { Chapter } from '../../redux/Manga/interfaces';
import { ChapterList } from '../../Components/ChapterList';
import { loadChapter } from '../../redux/Manga/mangaReducer';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack';
import { RootStackParamList } from '../../Navigator/RootStack/paramList';
import AppViews from '../../Navigator/AppViews';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'MangaDetail'>;

const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);

const compareFunction = (a: string, b:string) => {
  if(a=='unknown') return -1;
  if(b=='unknown') return +1;
  const intCompare = -parseInt(a) + parseInt(b);
  if (intCompare != NaN) return intCompare;
  return a > b ? -1 : 1;
};
export const MangaDetail = ({ navigation }: Props): ReactElement => {
  const { colors, dark } = useTheme();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const mangaDetail = useAppSelector((state) => state.mangaReducer.mangaDetail);
  if (mangaDetail) {
    const volumeList = Object.entries(
      groupBy(mangaDetail.chapters ?? [], (item) => item.volume ?? 'unknown'),
    );
    volumeList.sort((a, b) => compareFunction(a[0],b[0]));
    volumeList.forEach((volume) => {
      const chapterList = volume[1];
      chapterList.sort((a,b)=>compareFunction(a.name, b.name));
    });

    return (
      <>
        <View
          style={{
            backgroundColor: colors.accent,
            height: insets.top,
          }}
        />
        <StatusBar
          backgroundColor="transparent"
          barStyle={!dark ? 'dark-content' : 'light-content'}
          translucent
        />
        <FlatList
          ListHeaderComponentStyle={{
            ...styles.listHeader,
            backgroundColor: colors.primary,
          }}
          ListFooterComponentStyle={{
            ...styles.listFooter,
            backgroundColor: colors.primary,
          }}
          ListFooterComponent={<></>}
          ListHeaderComponent={
            <View
              style={{
                marginBottom: 0,
                paddingBottom: 0,
              }}>
              <Text style={styles.mangaName}>{mangaDetail.names[0]}</Text>
              <Image
                accessibilityIgnoresInvertColors
                resizeMode="contain"
                style={styles.thumbnail}
                source={{
                  uri: mangaDetail.cover_art,
                }}
              />
              {mangaDetail.names.length > 1 && (
                <View style={styles.line}>
                  <Text style={styles.label}>Alternative names: </Text>
                  <Text>{mangaDetail.names.slice(1).join(', ')}</Text>
                </View>
              )}
              <View style={styles.line}>
                <Text style={styles.label}>Author: </Text>
                <Text>{mangaDetail.author}</Text>
              </View>
              <View style={styles.line}>
                <Text style={styles.label}>Artist: </Text>
                <Text>{mangaDetail.artist}</Text>
              </View>
              <View style={styles.line}>
                <Text style={styles.label}>Genres: </Text>
                <Text>{mangaDetail.genres.join(', ')}</Text>
              </View>
              <View style={styles.line}>
                <Text style={styles.label}>Themes: </Text>
                <Text>{mangaDetail.themes.join(', ')}</Text>
              </View>
              <View style={styles.line}>
                <Text style={styles.label}>Demographics: </Text>
                <Text>{mangaDetail.demographic.join(', ')}</Text>
              </View>
              <View style={styles.line}>
                <Text style={styles.label}>Description: </Text>
                <Text>{mangaDetail.description}</Text>
              </View>
            </View>
          }
          data={volumeList}
          keyExtractor={([volume, _]) => volume}
          renderItem={({ item: [volume, chapters] }) => (
            <View
              style={{
                ...styles.listItem,
                backgroundColor: colors.primary,
              }}>
              <Text style={{ ...styles.volumeTitle, color: colors.text }}>
                Volume {volume}
              </Text>
              <ChapterList
                styles={styles.chapterList}
                chapters={chapters}
                itemCallback={(chapter: Chapter) => {
                  dispatch(loadChapter(chapter));
                  navigation.navigate(AppViews.MANGA_READER);
                }}
              />
            </View>
          )}
        />
      </>
    );
  } else
    return (
      <View style={styles.container}>
        <Text>Empty</Text>
      </View>
    );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginTop: 16,
    marginHorizontal: 16,
    padding: 16,
  },
  listHeader: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 16,
    marginHorizontal: 16,
    padding: 16,
  },
  listFooter: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 16,
    marginHorizontal: 16,
    padding: 16,
  },
  volumeTitle: {
    fontStyle: 'italic',
    fontSize: 17,
    paddingTop: 12,
    paddingBottom: 5,
  },
  chapterList: { paddingLeft: 20, paddingVertical: 5 },
  listItem: {
    marginHorizontal: 16,
    paddingHorizontal: 16,
  },
  mangaName: {
    fontSize: 22,
    paddingTop: 5,
    paddingBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  line: {
    marginVertical: 5,
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  thumbnail: {
    width: '100%',
    marginVertical: 10,
    aspectRatio: 1,
  },
});
