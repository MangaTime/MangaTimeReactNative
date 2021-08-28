import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import React, { ReactElement, useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Appbar, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack';
import { SmallMangaList } from '../../Components/MangaList/SmallMangaList';
import { SectionContainer } from '../../Components/SectionContainer';
import AppViews from '../../Navigator/AppViews';
import { MainTabsParamList } from '../../Navigator/MainTabs/paramList';
import { RootStackParamList } from '../../Navigator/RootStack/paramList';
import { Section } from '../../redux/AppSettings/appSettingsReducer';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import { Manga } from '../../redux/Manga/interfaces';
import { fetchFollowingManga } from '../../redux/Manga/mangaPersistReducer';
import {
  fetchAddedManga,
  fetchMangaDetail,
  fetchRandomManga,
  fetchUpdatedManga,
} from '../../redux/Manga/mangaReducer';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabsParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

interface Entry {
  title: string;
  key: string;
  dataSource: Manga[] | undefined;
  isVisible: boolean;
}

export const Home = ({ navigation }: Props): ReactElement => {
  const { colors, dark } = useTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { sections } = useAppSelector((state) => state.persist.appSetting);
  const { loggedIn } = useAppSelector((state) => state.persist.user);
  const { recentlyUpdatedManga, recentlyAddedManga, randomManga } =
    useAppSelector((state) => state.mangaReducer);
  const { followingManga } = useAppSelector((state) => state.persist.manga);

  const updateContent = async (): Promise<void> => {
    loggedIn && (await dispatch(fetchFollowingManga()));
    await dispatch(fetchUpdatedManga());
    await dispatch(fetchAddedManga());
    await dispatch(fetchRandomManga());
  };

  // update content by calling API
  useEffect(() => {
    updateContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  const getMangaDetail = (manga: Manga): void => {
    dispatch(fetchMangaDetail(manga));
    navigation.navigate(AppViews.MANGA_DETAIL, { manga });
  };

  const navToListMangaView = (id: string, name: string): void => {
    navigation.navigate(AppViews.LIST_MANGA_VIEW, {
      routeName: name,
      routeId: id,
    });
  };

  const entryList: Entry[] = [
    {
      title: 'Recently Updated',
      key: 'recentlyUpdated',
      isVisible: true,
      dataSource: recentlyUpdatedManga,
    },
    {
      title: 'Following',
      key: 'following',
      isVisible: true,
      dataSource: followingManga,
    },
    {
      title: 'Recently Added',
      key: 'recentlyAdded',
      isVisible: true,
      dataSource: recentlyAddedManga,
    },
    {
      title: 'Random',
      key: 'random',
      isVisible: true,
      dataSource: randomManga,
    },
  ];

  const sortEntryList = (): Section[] => {
    // Map data from redux to entryList
    const mappedSections = sections.map((e) => {
      return { ...(entryList.find((e1) => e.key === e1.key) as Entry), ...e };
    });
    const filteredSections = mappedSections.filter(
      (x): x is Entry => x != null,
    );
    return filteredSections;
  };
  let sortedEntryList = sortEntryList();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    sortedEntryList = sortEntryList();
  }, [sections]);

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
        <Appbar.Content title="Home" titleStyle={styles.appBarContent} />
      </Appbar>
      <FlatList
        data={sortedEntryList}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) =>
          item &&
          item.isVisible && (
            <SectionContainer>
              <SmallMangaList
                mangaList={
                  item.dataSource ? item.dataSource.slice(0, 10) : [] // data source
                }
                itemCallback={getMangaDetail} // item callback
                title={item.title}
                onShowMorePress={() => navToListMangaView(item.key, item.title)}
              />
            </SectionContainer>
          )
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  appBar: { paddingHorizontal: 24, justifyContent: 'space-between' },
  statusBarColor: { width: '100%' },
  appBarContent: { marginLeft: 0, textAlign: 'center' },
});
