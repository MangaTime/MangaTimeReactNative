import { ReactElement, ReactComponentElement } from 'react';
import {
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import { Chapter, Volume } from '../../redux/Manga/interfaces';
import { HomeStackParamList } from '../../Navigator/HomeStack/paramList';
import { ChapterList } from '../../Components/ChapterList';
import { loadChapter } from '../../redux/Manga/mangaReducer';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<HomeStackParamList, 'MangaDetail'>;

export const MangaDetail = ({ navigation }: Props): ReactElement => {
  const { colors, dark } = useTheme();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const mangaDetail = useAppSelector((state) => state.mangaReducer.mangaDetail);
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
          // style={{ ...styles.container, backgroundColor: colors.primary }}
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
              <Image
                accessibilityIgnoresInvertColors
                resizeMode="contain"
                style={styles.thumbnail}
                source={{
                  uri: `https://uploads.mangadex.org/covers/${mangaDetail.id}/${mangaDetail.cover_art}.256.jpg`,
                }}
              />
              <Text style={styles.mangaName}>{mangaDetail.name}</Text>
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
          // ItemSeparatorComponent={() => (
          //   <View style={styles.listSeparator}></View>
          // )}
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
                  navigation.navigate('MangaReader');
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
  // listSeparator: { marginLeft: 20, borderWidth: 1 },
  volumeTitle: {
    // fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 18,
    paddingTop: 12,
    paddingBottom: 5,
  },
  chapterList: { paddingLeft: 20 },
  listItem: {
    marginHorizontal: 16,
    paddingHorizontal: 16,
  },
  mangaName: {
    fontSize: 22,
    paddingTop: 15,
    paddingBottom: 5,
    fontWeight: 'bold',
  },
  line: {
    marginVertical: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 1,
  },
});
