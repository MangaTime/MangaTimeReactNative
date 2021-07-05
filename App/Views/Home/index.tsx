import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { MangaDetail } from '../../Components/MangaDetail';
import { MangaList } from '../../Components/MangaList';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import { AuthForm } from '../../Components/AuthForm';

export const Home: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AuthForm />
      <MangaList />
      <MangaDetail />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {},
});
