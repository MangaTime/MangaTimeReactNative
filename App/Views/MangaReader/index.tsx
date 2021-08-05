import {
  createRef,
  ReactElement,
  RefObject,
  useCallback,
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
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {
  Button,
  IconButton,
  Modal,
  Portal,
  ProgressBar,
  useTheme,
} from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import {
  fetchMangadexHomeBaseUrl,
  loadChapter,
} from '../../redux/Manga/mangaReducer';
import { CollapsibleHeaderFlatList } from 'react-native-collapsible-header-views';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import { Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

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
  const windowWidth = Dimensions.get('window').width;

  const [singleImageViewVisible, setSingleImageViewVisible] = useState(false);
  const [singleImageViewUrl, setSingleImageViewUrl] = useState('');

  const showModal = () => setSingleImageViewVisible(true);
  const hideModal = () => setSingleImageViewVisible(false);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (singleImageViewVisible) {
          hideModal();
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [singleImageViewVisible]),
  );

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
    <>
      <Portal>
        <Modal visible={singleImageViewVisible}>
          <View>
            <Text
              style={{
                position: 'absolute',
                width: '100%',
                textAlignVertical: 'center',
                textAlign: 'center',
                top: -insets.top,
                height: insets.top,
                color: colors.primary,
                backgroundColor: colors.accent,
              }}>
              Double tap image to close
            </Text>
            <View
              style={{
                overflow: 'hidden',
                width: '100%',
                height: '100%',
              }}>
              <ReactNativeZoomableView
                maxZoom={2}
                minZoom={1}
                zoomStep={0}
                initialZoom={1.25}
                bindToBorders={true}
                doubleTapZoomToCenter={false}
                onDoubleTapAfter={hideModal}
                style={{
                  paddingHorizontal: 24,
                }}>
                <Image
                  accessibilityIgnoresInvertColors
                  resizeMode="contain"
                  style={styles.mangaPage}
                  source={{
                    uri: `${singleImageViewUrl}`,
                  }}
                />
              </ReactNativeZoomableView>
            </View>
          </View>
        </Modal>
      </Portal>
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
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                setSingleImageViewUrl(
                  `${baseUrl}/data/${chapterDetail?.hash}/${page.item}`,
                );
                showModal();
              }}>
              <Image
                accessibilityIgnoresInvertColors
                resizeMode="contain"
                style={styles.mangaPage}
                source={{
                  uri: `${baseUrl}/data/${chapterDetail?.hash}/${page.item}`,
                }}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </>
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
