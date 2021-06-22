import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

export const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Home</Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: { width: 100 },
});
