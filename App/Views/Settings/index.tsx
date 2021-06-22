import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

export const Settings = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Setting</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { width: 100 },
});
