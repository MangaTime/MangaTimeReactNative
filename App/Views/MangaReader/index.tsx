import React from 'react';
import { SafeAreaView, StyleSheet, Button, Text } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';

export const MangaReader: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <SafeAreaView style={styles.container}>
      <Text>Manga reader</Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {},
});
