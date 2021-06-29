import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text } from 'react-native';
import { decrement, increment } from '../../redux/Counter/counterReducer';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';

export const Home = () => {
  const count = useAppSelector((state) => state.persist.counter.value);
  const dispatch = useAppDispatch();
  const onIncrease = () => {
    dispatch(increment());
  };

  const onDecrease = () => {
    dispatch(decrement());
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text>{count}</Text>
      <Button onPress={onIncrease} title="+" />
      <Button onPress={onDecrease} title="-" />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: { width: 100 },
});
