import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface ThemeSelectButtonProps {
  color: string;
  selectedColor: string;
  onPress: () => any;
  isSelected: boolean;
}

export const ThemeSelectButton = ({
  color,
  selectedColor,
  onPress,
  isSelected,
}: ThemeSelectButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.themeButtonContainer,
        ...{ backgroundColor: color },
      }}>
      <View
        style={{
          ...styles.themeButton,
          ...{ backgroundColor: isSelected ? selectedColor : color },
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  themeButtonContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 16,
  },
  themeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
