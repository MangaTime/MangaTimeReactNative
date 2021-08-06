import { ReactElement } from 'react';
import {
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import { Chapter } from '../../redux/Manga/interfaces';
import { ChapterList } from '../../Components/ChapterList';
import { loadChapter } from '../../redux/Manga/mangaReducer';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack';
import { RootStackParamList } from '../../Navigator/RootStack/paramList';
import AppViews from '../../Navigator/AppViews';

type Props = NativeStackScreenProps<RootStackParamList, 'MangaDetail'>;

export const MangaDetail = ({ navigation }: Props): ReactElement => {
  const dispatch = useAppDispatch();
  const mangaDetail = useAppSelector((state) => state.mangaReducer.mangaDetail);
  if (mangaDetail) {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          ListHeaderComponentStyle={{
            borderColor: 'red',
            borderWidth: 2,
            marginBottom: 0,
            paddingBottom: 0,
          }}
          ListHeaderComponent={
            <View
              style={{
                borderColor: 'black',
                borderWidth: 2,
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
              <Text style={styles.mangaDescription}>
                {mangaDetail.description}
              </Text>
            </View>
          }
          data={mangaDetail.volumes}
          keyExtractor={(vol) => vol.name}
          renderItem={(vol) => (
            <View
              style={{
                borderColor: 'black',
                borderWidth: 2,
              }}>
              <Text>Volume {vol.item.name}</Text>
              <ChapterList
                volume={vol.item}
                itemCallback={(chapter: Chapter) => {
                  dispatch(loadChapter(chapter));
                  navigation.navigate(AppViews.MANGA_READER);
                }}
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
  container: {
    width: '100%',
    height: '100%',
  },
  mangaName: {
    width: '100%',
    borderColor: 'black',
    borderWidth: 2,
  },
  mangaDescription: {
    width: '100%',
    borderColor: 'black',
    borderWidth: 2,
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 1,
  },
});
