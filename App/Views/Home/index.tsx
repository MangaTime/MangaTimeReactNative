import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { MangaDetail } from '../../Components/MangaDetail';
import { MangaList } from '../../Components/MangaList';

export const Home: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MangaList />
      <MangaDetail />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {},
});
