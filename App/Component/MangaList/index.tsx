import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ReduxThunk from 'redux-thunk';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';

import {fetchUpdatedManga} from '../../redux/Manga/mangaReducer'
export const MangaList = () => {
  // const count = useAppSelector((state) => state.persist.counter.value);
  const dispatch = useAppDispatch();
  const onIncrease = () => {
    dispatch(fetchUpdatedManga());
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button onPress={onIncrease} title="Update" />
      <Text>123456789</Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: { width: 100 },
});
