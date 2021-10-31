import { ReactElement, useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Image,
  View,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import { CollapsibleHeaderFlatList } from 'react-native-collapsible-header-views';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { SingleImageViewModal } from './Components/singleImageViewModal';
import { ImageListHeader } from './Components/imageListHeader';
import { MangaSources } from '../../Services/MangaSources';
import SupportedSources from '../../Services/MangaSources/supportedSources';

export const MangaReader = (): ReactElement => {
  const { colors, dark } = useTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const chapterDetail = useAppSelector(
    (state) => state.mangaReducer.readingChapter,
  );
  const [pages, setPages] = useState<string[]>([]);
  useEffect(() => {
    (async () => {
      if (chapterDetail) {
        let first = Object.keys(
          chapterDetail.sourceInfo[0],
        )[0] as keyof SupportedSources;
        setPages(await MangaSources[first].manga.loadChapter(chapterDetail));
      }
    })();
  }, [chapterDetail]);

  const [readingProgress, setReadingProgress] = useState(0);
  const windowHeight = Dimensions.get('window').height;

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

  // useEffect(() => {
  //   (async () => {
  //     if (chapterDetail)
  //       await dispatch(fetchMangadexHomeBaseUrl(chapterDetail));
  //   })();
  // }, [chapterDetail, dispatch]);

  return (
    <>
      <SingleImageViewModal
        visible={singleImageViewVisible}
        imageUri={singleImageViewUrl}
        onDismiss={hideModal}
      />
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
            <ImageListHeader readingProgress={readingProgress} />
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
          data={pages}
          keyExtractor={(page) => page}
          renderItem={(page) => (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                setSingleImageViewUrl(
                  page.item,
                );
                showModal();
              }}>
              <Image
                accessibilityIgnoresInvertColors
                resizeMode="contain"
                style={styles.mangaPage}
                source={{
                  uri: page.item,
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
  mangaPage: {
    width: '100%',
    aspectRatio: 0.7,
  },
  statusBar: { width: '100%', zIndex: 1000 },
});
