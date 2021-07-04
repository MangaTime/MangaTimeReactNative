import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { Cards } from '../../components/Cards';
import { MangaList } from '../../Component/MangaList';
import { MangaDetail } from '../../Component/MangaDetail';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
export const Home = () => {
  const dispatch = useAppDispatch();
  return (
    <SafeAreaView style={styles.container}>
      <MangaList></MangaList>
      <MangaDetail></MangaDetail>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {},
  mangaList: { width: 100 },
});
