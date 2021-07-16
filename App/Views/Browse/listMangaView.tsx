import { RouteProp } from '@react-navigation/native';
import { ReactElement, useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Appbar, IconButton, Searchbar, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LargeMangaList } from '../../Components/MangaList/LargeMangaList';
import { BrowseStackParamList } from '../../Navigator/BrowseStack/paramList';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import {
  fetchMangaDetail,
  fetchUpdatedManga,
  Manga,
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
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query: string): void => setSearchQuery(query);

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
      dataHookFunction = (state) => state.mangaReducer.recentlyUpdatedManga;
      updateDataFunction = () => {
        dispatch(fetchUpdatedManga());
      };
      break;
    case 'following':
      dataHookFunction = (state) => state.mangaReducer.recentlyUpdatedManga;
      updateDataFunction = () => {
        dispatch(fetchUpdatedManga());
      };
      break;
    case 'recentlyAdded':
      dataHookFunction = (state) => state.mangaReducer.recentlyUpdatedManga;
      updateDataFunction = () => {
        dispatch(fetchUpdatedManga());
      };
      break;
    case 'random':
      dataHookFunction = (state) => state.mangaReducer.recentlyUpdatedManga;
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
        <Text
          style={{
            color: colors.text,
            fontSize: 24,
            // textTransform: 'uppercase',
            textAlign: 'center',
            marginRight: 20,
          }}>
          {routeName}
        </Text>
        <IconButton
          icon="magnify"
          color={colors.text}
          style={{
            ...styles.buttonRightIcon,
            ...{ backgroundColor: colors.primary },
          }}
          onPress={() => console.log('aaa')}
        />
      </Appbar>
      {!['recentlyUpdated', 'recentlyAdded', 'following', 'random'].includes(
        routeId,
      ) ? (
        <Text>Route ID invalid</Text>
      ) : (
        <LargeMangaList mangaList={data} itemCallback={getMangaDetail} />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  appBar: { paddingHorizontal: 24, justifyContent: 'space-between' },
  searchBox: {
    borderRadius: 20,
    flex: 1,
    height: 40,
    alignItems: 'center',
  },
  searchBoxInput: { fontSize: 14 },
  statusBarColor: { width: '100%' },
  buttonRightIcon: {
    // alignSelf: 'flex-end',
  },
});
