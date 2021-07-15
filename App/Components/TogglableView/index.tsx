import React, { ReactElement, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Checkbox, useTheme } from 'react-native-paper';

interface Props {
  Component: ReactElement;
  onChangeCallback: (isChecked: boolean) => void;
  isShowingToggle: boolean | undefined;
}
export const TogglableView = ({
  Component,
  onChangeCallback,
  isShowingToggle = false,
}: Props): ReactElement => {
  const { colors, dark } = useTheme();
  const [checked, setChecked] = useState(isShowingToggle);
  return (
    <View
      style={{
        ...styles.container,
        ...{ backgroundColor: colors.primary },
      }}>
      <View style={isShowingToggle ? styles.containerLeft : {}}>
        {Component}
      </View>
      <View style={isShowingToggle ? styles.containerRight : {}}>
        {isShowingToggle ? (
          <Checkbox
            color={colors.accent}
            uncheckedColor={colors.background}
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
              onChangeCallback(checked);
            }}
          />
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  button: { borderRadius: 20 },
  container: {
    flexDirection: 'row',
    marginTop: 16,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 10,
  },
  containerLeft: {
    width: '85%',
  },
  containerRight: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBarColor: { width: '100%' },
});
