import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Cards } from '../../components/Cards';
import { MangaList } from '../../Component/MangaList';
import { decrement, increment } from '../../redux/Counter/counterReducer';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';

export const Home: React.FC = () => {
  const count = useAppSelector((state) => state.persist.counter.value);
  const dispatch = useAppDispatch();
  const onIncrease = (): void => {
    dispatch(increment());
  };
  const onDecrease = (): void => {
    dispatch(decrement());
  };
  return (
    <SafeAreaView style={styles.container}>
      <MangaList></MangaList>
      <Text>{count}</Text>
      <Button onPress={onIncrease} title="+" />
      <Button onPress={onDecrease} title="-" />
      <Icon size={20} name="glass" />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {},
});
