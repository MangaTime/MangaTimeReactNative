import { RouteProp } from '@react-navigation/native';
import { ReactElement, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Appbar, IconButton, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack';
import { LargeMangaList } from '../../Components/MangaList/LargeMangaList';
import { BrowseStackParamList } from '../../Navigator/BrowseStack/paramList';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import { Manga } from '../../redux/Manga/interfaces';
import {
  fetchMangaDetail,
  fetchUpdatedManga,
} from '../../redux/Manga/mangaReducer';
import { RootState } from '../../redux/store';

type BrowseScreenNavigationProp = NativeStackNavigationProp<
  BrowseStackParamList,
  'ListMangaView'
>;

type BrowseScreenRouteProp = RouteProp<BrowseStackParamList, 'ListMangaView'>;

type Props = {
  route: BrowseScreenRouteProp;
  navigation: BrowseScreenNavigationProp;
};

export const ListMangaView = ({ route, navigation }: Props): ReactElement => {
  const { colors, dark } = useTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { routeName, routeId }: BrowseStackParamList['ListMangaView'] =
    route.params;

  const getMangaDetail = (manga: Manga): void => {
    dispatch(fetchMangaDetail(manga));
    navigation.navigate('MangaDetail');
  };

  let dataHookFunction: (state: RootState) => Manga[];
  let updateDataFunction: (() => void) | undefined;

  // TODO: data not available in master branch atm
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
        dispatch(fetchUpdatedManga());
      };
      break;
    case 'recentlyAdded':
      dataHookFunction = (state) => state.mangaReducer.recentlyAddedManga ?? [];
      updateDataFunction = () => {
        dispatch(fetchUpdatedManga());
      };
      break;
    case 'random':
      dataHookFunction = (state) => state.mangaReducer.randomManga ?? [];
      updateDataFunction = () => {
        dispatch(fetchUpdatedManga());
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
