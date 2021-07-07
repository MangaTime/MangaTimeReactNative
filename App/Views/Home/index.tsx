import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { MangaDetail } from '../../Components/MangaDetail';
import { MangaList } from '../../Components/MangaList';
import { AuthForm } from '../../Components/AuthForm';

import { FollowingList } from '../../Components/FollowingList';

export const Home: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AuthForm />
      <FollowingList />
      <MangaList />
      <MangaDetail />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {},
});
