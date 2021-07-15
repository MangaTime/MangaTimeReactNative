import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar } from 'react-native';
import { LargeMangaList } from '../../Components/MangaList/LargeMangaList';
import { AuthForm } from '../../Components/AuthForm';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import {
  fetchMangaDetail,
  fetchUpdatedManga,
} from '../../redux/Manga/mangaReducer';
import { Manga } from '../../redux/Manga/interfaces';
import { SmallMangaList } from '../../Components/MangaList/SmallMangaList';
import { useEffect } from 'react';
import { HomeStackParamList } from '../../Navigator/HomeStack/paramList';
import {
  fetchFollowingManga,
  popFirstChapterFeed,
} from '../../redux/Manga/mangaPersistReducer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Appbar,
  Button,
  Checkbox,
  IconButton,
  Title,
  useTheme,
} from 'react-native-paper';
import { Text } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack';
import { TogglableView } from '../../Components/TogglableView';
import {
  AllSections,
  updateVisibility,
} from '../../redux/AppSettings/appSettingsReducer';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export const Home = ({ navigation }: Props) => {
  const { colors, dark } = useTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const [isEditingVisibility, setIsEditingVisibility] = useState(false);
  const sectionsVisibility = useAppSelector(
    (state) => state.persist.appSetting.visibility,
  );

  const recentlyUpdatedManga = useAppSelector(
    (state) => state.mangaReducer.recentlyUpdatedManga,
  );
  // const recentlyAddedManga = useAppSelector(
  //   (state) => state.mangaReducer.recentlyAddedManga,
  // );
  useEffect(() => {
    dispatch(fetchUpdatedManga());
  }, []);
  const followingManga = useAppSelector(
    (state) => state.persist.manga.followingManga,
  );
  const updateMangaList = () => {
    dispatch(fetchUpdatedManga());
    dispatch(fetchFollowingManga());
  };
  const getMangaDetail = (manga: Manga) => {
    dispatch(fetchMangaDetail(manga));
    navigation.navigate('MangaDetail', { manga });
  };

  const toggleEditingVisibility = () => {
    setIsEditingVisibility(!isEditingVisibility);
  };
  const dispatchUpdateVisibility = (updated: AllSections) => {
    dispatch(
      updateVisibility({
        ...sectionsVisibility,
        ...updated,
      }),
    );
  };
  return (
    <>
      {/* <SafeAreaView style={styles.container}> */}
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
      <Appbar>
        {/*  */}
        <Appbar.Content title="Home" />
        <IconButton
          icon={isEditingVisibility ? 'playlist-check' : 'playlist-edit'}
          color={colors.text}
          // background={colors.accent}
          style={{
            ...{ backgroundColor: colors.background },
          }}
          onPress={() => toggleEditingVisibility()}
        />
      </Appbar>
      {/* <AuthForm />
      <Button onPress={() => dispatch(popFirstChapterFeed())} title="Pop" />
      <Button onPress={updateMangaList} title="Update" /> */}
      <ScrollView>
        <TogglableView
          Component={
            <SmallMangaList
              mangaList={recentlyUpdatedManga?.slice(0, 10)}
              itemCallback={getMangaDetail}
              title="Recently Updated"
            />
          }
          onChangeCallback={(status) =>
            dispatchUpdateVisibility({ recentlyUpdated: status })
          }
          isShowingToggle={isEditingVisibility}
        />

        <TogglableView
          Component={
            <SmallMangaList
              mangaList={followingManga?.slice(0, 10)}
              itemCallback={getMangaDetail}
              title="Following"
            />
          }
          onChangeCallback={(status) =>
            dispatchUpdateVisibility({ following: status })
          }
          isShowingToggle={isEditingVisibility}
        />
      </ScrollView>
      {/* </SafeAreaView> */}
    </>
  );
};
const styles = StyleSheet.create({
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
