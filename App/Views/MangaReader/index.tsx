import {
  createRef,
  ReactElement,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  StyleSheet,
  Image,
  View,
  StatusBar,
  Dimensions,
  PickerIOSItem,
} from 'react-native';
import { Button, IconButton, ProgressBar, useTheme } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import {
  fetchMangadexHomeBaseUrl,
  loadChapter,
} from '../../redux/Manga/mangaReducer';
import { CollapsibleHeaderFlatList } from 'react-native-collapsible-header-views';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';

export const MangaReader = (): ReactElement => {
  const { colors, dark } = useTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const mangaDetail = useAppSelector((state) => state.mangaReducer.mangaDetail);
  const chapterDetail = useAppSelector(
    (state) => state.mangaReducer.readingChapter,
  );
  const baseUrl = useAppSelector((state) => state.mangaReducer.baseUrl);

  const [selectedChapter, setSelectedChapter] = useState(chapterDetail?.id);
  const [readingProgress, setReadingProgress] = useState(0);
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    (async () => {
      if (chapterDetail)
        await dispatch(fetchMangadexHomeBaseUrl(chapterDetail));
    })();
  }, [chapterDetail, dispatch]);

  const previousChapter = (shouldNavigate = false): boolean => {
    if (mangaDetail && mangaDetail.chapters && chapterDetail)
      for (let i = 0; i < mangaDetail.chapters.length; i++)
        if (
          parseFloat(mangaDetail.chapters[i].name) <
          parseFloat(chapterDetail.name)
        ) {
          if (shouldNavigate) dispatch(loadChapter(mangaDetail.chapters[i]));
          return true;
        }

    return false;
  };

  const nextChapter = (shouldNavigate = false): boolean => {
    if (mangaDetail && mangaDetail.chapters && chapterDetail)
      for (let i = mangaDetail.chapters.length - 1; i >= 0; i--)
        if (
          parseFloat(mangaDetail.chapters[i].name) >
          parseFloat(chapterDetail.name)
        ) {
          if (shouldNavigate) dispatch(loadChapter(mangaDetail.chapters[i]));
          return true;
        }

    return false;
  };

  const chapterList = mangaDetail?.chapters?.map((chapter) => (
    <Picker.Item
      label={`${chapter.name} - ${chapter.title}`}
      value={`${chapter.id}`}
    />
  ));
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.statusBar,
          {
            backgroundColor: colors.accent,
            height: insets.top,
          },
        ]}
      />
      <StatusBar
        backgroundColor="transparent"
        barStyle={!dark ? 'dark-content' : 'light-content'}
        translucent
      />

      <CollapsibleHeaderFlatList
        CollapsibleHeaderComponent={
          <View style={styles.headerContainer}>
            <View style={styles.header}>
              <Picker
                style={{ ...styles.chapterPicker, color: colors.text }}
                itemStyle={{ color: colors.text }}
                dropdownIconColor={colors.text}
                selectedValue={selectedChapter}
                onValueChange={(itemValue, itemIndex) => {
                  if (mangaDetail && mangaDetail.chapters) {
                    dispatch(loadChapter(mangaDetail.chapters[itemIndex]));
                    setSelectedChapter(itemValue);
                  }
                }}>
                {chapterList}
              </Picker>
              <IconButton
                icon="chevron-left"
                color={colors.text}
                style={{ backgroundColor: colors.accent }}
                disabled={!previousChapter()}
                onPress={() => previousChapter(true)}
              />
              <IconButton
                icon="chevron-right"
                color={colors.text}
                style={{ backgroundColor: colors.accent }}
                disabled={!nextChapter()}
                onPress={() => nextChapter(true)}
              />
            </View>

            <ProgressBar
              progress={readingProgress}
              color={colors.accent}
              style={{ position: 'absolute', bottom: -5, height: 5 }}
            />
          </View>
        }
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        headerContainerBackgroundColor={colors.background}
        headerHeight={50}
        disableHeaderSnap={true}
        onMomentumScrollEnd={({ nativeEvent }) => {
          setReadingProgress(
            nativeEvent.contentOffset.y /
              (nativeEvent.contentSize.height - windowHeight),
          );
        }}
        data={chapterDetail?.pages}
        keyExtractor={(page) => page}
        renderItem={(page) => (
          <Image
            accessibilityIgnoresInvertColors
            resizeMode="contain"
            style={styles.mangaPage}
            source={{
              uri: `${baseUrl}/data/${chapterDetail?.hash}/${page.item}`,
            }}
          />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: { width: '100%', height: '100%' },
  chapterPicker: { flex: 1 },
  headerContainer: {
    height: '100%',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 16,
  },
  mangaPage: {
    width: '100%',
    aspectRatio: 0.7,
  },
  statusBar: { width: '100%', zIndex: 1000 },
});
