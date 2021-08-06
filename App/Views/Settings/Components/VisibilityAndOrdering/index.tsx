import { useNavigation } from '@react-navigation/native';
import React, { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Title, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppViews from '../../../../Navigator/AppViews';
import { baseColors } from '../../../../Theme/baseColors';

export const VisibilityAndOrdering = (): ReactElement => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <View
      style={{
        ...styles.container,
        ...{ backgroundColor: colors.primary },
      }}>
      <View style={styles.titleContainer}>
        <Icon
          size={24}
          name="color-lens"
          style={[styles.titleIcon, { color: colors.text }]}
        />
        <Title>Sections visibility and ordering</Title>
      </View>
      <Button
        style={{ ...styles.button, backgroundColor: colors.accent }}
        color={colors.text}
        onPress={() => {
          navigation.navigate(AppViews.SECTION_VISIBILITIES_AND_ORDERING);
        }}>
        Edit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    padding: 16,
    borderRadius: 10,
    shadowColor: baseColors.black.dark,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleIcon: {
    marginRight: 16,
  },
  button: {
    borderRadius: 20,
    marginTop: 16,
  },
});
