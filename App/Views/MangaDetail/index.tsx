import { ReactElement } from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack';
import { ChapterList } from '../../Components/ChapterList';
import AppViews from '../../Navigator/AppViews';
import { RootStackParamList } from '../../Navigator/RootStack/paramList';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import { Chapter } from '../../redux/Manga/interfaces';
import { loadChapter } from '../../redux/Manga/mangaReducer';

type Props = NativeStackScreenProps<RootStackParamList, 'MangaDetail'>;

export const MangaDetail = ({ navigation }: Props): ReactElement => {
  const { colors, dark } = useTheme();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const mangaDetail = useAppSelector((state) => state.manga.mangaDetail);
  if (mangaDetail) {
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
              <Text style={styles.mangaName}>{mangaDetail.name}</Text>
              <Image
                accessibilityIgnoresInvertColors
                resizeMode="contain"
                style={styles.thumbnail}
                source={{
                  uri: `https://uploads.mangadex.org/covers/${mangaDetail.id}/${mangaDetail.cover_art}.256.jpg`,
                }}
              />
              <View style={styles.line}>
                <Text style={styles.label}>Alternative names: </Text>
                <Text>{mangaDetail.alternative_names.join(', ')}</Text>
              </View>
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
          data={mangaDetail.volumes}
          keyExtractor={(vol) => vol.name}
          renderItem={(vol) => (
            <View
              style={{
                ...styles.listItem,
                backgroundColor: colors.primary,
              }}>
              <Text style={{ ...styles.volumeTitle, color: colors.text }}>
                Volume {vol.item.name}
              </Text>
              <ChapterList
                styles={styles.chapterList}
                volume={vol.item}
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
