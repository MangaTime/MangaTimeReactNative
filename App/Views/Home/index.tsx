import React from 'react';
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
import { StackNavigationProp } from '@react-navigation/stack';
import {
  fetchFollowingManga,
  popFirstChapterFeed,
} from '../../redux/Manga/mangaPersistReducer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Appbar, Button, Title, useTheme } from 'react-native-paper';
import { Text } from 'react-native';

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export const Home = ({ navigation }: Props) => {
  const { colors, dark } = useTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const recentlyUpdatedManga = useAppSelector(
    (state) => state.mangaReducer.recentlyUpdatedManga,
  );
  // const recentlyAddedManga = useAppSelector(
  //   (state) => state.mangaReducer.recentlyAddedManga,
  // );
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button mode="contained" onPress={() => console.log('aaa')}>
          aaaa
        </Button>
      ),
    });
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
        <Icon size={40} name="account-circle" style={{ color: colors.text }} />
        <Appbar.Content title="Setting" />
        <Button
          mode="contained"
          style={{
            ...styles.button,
            ...{ backgroundColor: colors.accent },
          }}
          onPress={() => console.log('test')}>
          Login
        </Button>
      </Appbar>
      {/* <AuthForm />
      <Button onPress={() => dispatch(popFirstChapterFeed())} title="Pop" />
      <Button onPress={updateMangaList} title="Update" /> */}
      <ScrollView>
        <View
          style={{
            ...styles.container,
            ...{ backgroundColor: colors.primary },
          }}>
          <SmallMangaList
            mangaList={recentlyUpdatedManga?.slice(0, 10)}
            itemCallback={getMangaDetail}
            title="Recently Updated"
          />
          <SmallMangaList
            mangaList={followingManga?.slice(0, 10)}
            itemCallback={getMangaDetail}
            title="Following"
          />
        </View>
      </ScrollView>
      {/* </SafeAreaView> */}
    </>
  );
};
const styles = StyleSheet.create({
  button: { borderRadius: 20 },
  container: {
    marginTop: 16,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 10,
  },
  statusBarColor: { width: '100%' },
});
