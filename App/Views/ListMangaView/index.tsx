import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { ReactElement, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Appbar, IconButton, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack';
import { LargeMangaList } from '../../Components/MangaList/LargeMangaList';
import AppViews from '../../Navigator/AppViews';
import { MainTabsParamList } from '../../Navigator/MainTabs/paramList';
import { RootStackParamList } from '../../Navigator/RootStack/paramList';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import { Manga } from '../../redux/Manga/interfaces';
import { fetchFollowingManga } from '../../redux/Manga/mangaPersistReducer';
import {
  fetchAddedManga,
  fetchMangaDetail,
  fetchRandomManga,
  fetchUpdatedManga,
} from '../../redux/Manga/mangaReducer';
import { RootState } from '../../redux/store';

type ListMangaViewScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabsParamList, 'Browse'>,
  NativeStackNavigationProp<RootStackParamList>
>;
type ListMangaViewScreenRouteProp = RouteProp<
  RootStackParamList,
  'ListMangaView'
>;

type Props = {
  route: ListMangaViewScreenRouteProp;
  navigation: ListMangaViewScreenNavigationProp;
};

export const ListMangaView = ({ route, navigation }: Props): ReactElement => {
  const { colors, dark } = useTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { routeName, routeId }: RootStackParamList['ListMangaView'] =
    route.params;

  const getMangaDetail = (manga: Manga): void => {
    // TODO: move fetchMangaDetail to MangaDetail page
    dispatch(fetchMangaDetail(manga));
    navigation.navigate(AppViews.MANGA_DETAIL, { manga });
  };

  let dataHookFunction: (state: RootState) => Manga[];
  let updateDataFunction: (() => void) | undefined;

  // TODO: add offset + limit to updateDataFunction use it to paginate the list

  switch (routeId) {
    case 'recentlyUpdated':
      dataHookFunction = (state) =>
        state.mangaReducer.recentlyUpdatedManga ?? [];
      updateDataFunction = () => {
        dispatch(fetchUpdatedManga());
      };
      break;
    case 'following':
      dataHookFunction = (state) => state.persist.manga.followingManga ?? [];
      updateDataFunction = () => {
        dispatch(fetchFollowingManga());
      };
      break;
    case 'recentlyAdded':
      dataHookFunction = (state) => state.mangaReducer.recentlyAddedManga ?? [];
      updateDataFunction = () => {
        dispatch(fetchAddedManga());
      };
      break;
    case 'random':
      dataHookFunction = (state) => state.mangaReducer.randomManga ?? [];
      updateDataFunction = () => {
        dispatch(fetchRandomManga());
      };
      break;
    default:
      updateDataFunction = undefined;
      dataHookFunction = () => [];
      break;
  }
  const data = useAppSelector(dataHookFunction);

  useEffect(() => {
    if (updateDataFunction) updateDataFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <View
        style={[
          styles.statusBarColor,
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
      <Appbar style={styles.appBar}>
        <Text style={{ ...styles.appBarTitle, color: colors.text }}>
          {routeName}
        </Text>
        <IconButton
          icon="magnify"
          color={colors.text}
          style={{ backgroundColor: colors.primary }}
          onPress={() => console.log('aaa')}
        />
      </Appbar>
      {!['recentlyUpdated', 'recentlyAdded', 'following', 'random'].includes(
        routeId,
      ) ? (
        <Text>Route ID invalid</Text>
      ) : (
        <>
          <LargeMangaList mangaList={data} itemCallback={getMangaDetail} />
        </>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  appBar: { paddingHorizontal: 24, justifyContent: 'space-between' },
  appBarTitle: {
    fontSize: 24,
    textAlign: 'center',
    marginRight: 20,
  },
  statusBarColor: { width: '100%' },
});
