import React, { ReactElement, useState } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { SmallMangaList } from '../../Components/MangaList/SmallMangaList';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import {
  fetchAddedManga,
  fetchMangaDetail,
  fetchRandomManga,
  fetchUpdatedManga,
} from '../../redux/Manga/mangaReducer';
import { Manga } from '../../redux/Manga/interfaces';
import { useEffect } from 'react';
import { fetchFollowingManga } from '../../redux/Manga/mangaPersistReducer';
import { FlatList } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Appbar, useTheme } from 'react-native-paper';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack';
import { SectionContainer } from '../../Components/SectionContainer';
import { RootStackParamList } from '../../Navigator/RootStack/paramList';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabsParamList } from '../../Navigator/MainTabs/paramList';
import AppViews from '../../Navigator/AppViews';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabsParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export const Home = ({ navigation }: Props): ReactElement => {
  const { colors, dark } = useTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const sections = useAppSelector((state) => state.persist.appSetting.sections);
  // const isLoggedIn = useAppSelector((state) => state.persist.user);

  // get sections' content from state
  const recentlyUpdatedManga = useAppSelector(
    (state) => state.mangaReducer.recentlyUpdatedManga,
  );
  const recentlyAddedManga = useAppSelector(
    (state) => state.mangaReducer.recentlyAddedManga,
  );
  const randomManga = useAppSelector((state) => state.mangaReducer.randomManga);
  const followingManga = useAppSelector(
    (state) => state.persist.manga.followingManga,
  );

  // update content by calling API
  useEffect(() => {
    (async () => {
      if (sections.find((e) => e.key === 'following')?.isVisible)
        await dispatch(fetchFollowingManga());
      if (sections.find((e) => e.key === 'recentlyUpdated')?.isVisible)
        await dispatch(fetchUpdatedManga());
      if (sections.find((e) => e.key === 'recentlyAdded')?.isVisible)
        await dispatch(fetchAddedManga());
      if (sections.find((e) => e.key === 'random')?.isVisible)
        await dispatch(fetchRandomManga());
    })();
  }, []);

  const getMangaDetail = (manga: Manga) => {
    dispatch(fetchMangaDetail(manga));
    navigation.navigate(AppViews.MANGA_DETAIL, { manga });
  };

  interface Entry {
    title: string;
    key: string;
    dataSource: Manga[] | undefined;
    isVisible: boolean;
    showMore: () => void;
  }

  const showMoreActionCreator = (id: string, name: string) => {
    return () => {
      navigation.navigate(AppViews.LIST_MANGA_VIEW, {
        routeName: name,
        routeId: id,
      });
    };
  };
  const entryList: Entry[] = [
    {
      title: 'Recently Updated',
      key: 'recentlyUpdated',
      isVisible: true,
      dataSource: recentlyUpdatedManga,
      showMore: showMoreActionCreator('recentlyUpdated', 'Recently Updated'),
    },
    {
      title: 'Following',
      key: 'following',
      isVisible: true,
      dataSource: followingManga,
      showMore: showMoreActionCreator('following', 'Following'),
    },
    {
      title: 'Recently Added',
      key: 'recentlyAdded',
      isVisible: true,
      dataSource: recentlyAddedManga,
      showMore: showMoreActionCreator('recentlyAdded', 'Recently Added'),
    },
    {
      title: 'Random',
      key: 'random',
      isVisible: true,
      dataSource: randomManga,
      showMore: showMoreActionCreator('random', 'Random'),
    },
  ];
  const sortEntryList = () => {
    return sections
      .map((e) => {
        return { ...(entryList.find((e1) => e.key == e1.key) as Entry), ...e };
      })
      .filter((x): x is Entry => x != null);
  };
  let sortedEntryList = sortEntryList();
  useEffect(() => {
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
        <Appbar.Content
          title="Home"
          titleStyle={{ marginLeft: 0, textAlign: 'center' }}
        />
      </Appbar>
      <FlatList
        data={sortedEntryList}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) =>
          item &&
          item.isVisible &&
          item.dataSource &&
          item.dataSource.length > 0 && (
            <SectionContainer>
              <SmallMangaList
                mangaList={
                  item.dataSource ? item.dataSource.slice(0, 10) : [] // data source
                }
                itemCallback={getMangaDetail} // item callback
                title={item.title}
                onShowMorePress={item.showMore}
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
  button: { borderRadius: 20 },
  container: {
    flexDirection: 'row',
    marginTop: 16,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 10,
  },
  containerLeft: {
    width: '85%',
  },
  containerRight: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBarColor: { width: '100%' },
});
