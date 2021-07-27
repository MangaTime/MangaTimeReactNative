import { ReactElement, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Checkbox, useTheme } from 'react-native-paper';

export interface Props {
  Component: ReactElement;
  onChangeCallback: (isChecked: boolean) => void;
  isShowingToggle?: boolean;
  toggleValue?: boolean;
}

export const TogglableView = ({
  Component,
  onChangeCallback,
  isShowingToggle = false,
  toggleValue = false,
}: Props): ReactElement => {
  const { colors, dark } = useTheme();
  const [checked, setChecked] = useState(toggleValue);

  return (
    <View
      style={{
        ...styles.container,
      }}>
      <View
        style={{
          ...styles.containerLeftBase,
          ...(isShowingToggle && styles.containerLeftToggle),
          ...{ backgroundColor: colors.primary },
        }}>
        {Component}
      </View>
      <View style={isShowingToggle ? styles.containerRight : {}}>
        {isShowingToggle && (
          <Checkbox
            color={colors.text}
            uncheckedColor={colors.accent}
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              const newValue = !checked;
              setChecked(newValue);
              onChangeCallback(newValue);
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 16,
    marginHorizontal: 16,
  },
  containerLeftBase: {
    padding: 16,
    borderRadius: 10,
    width: '100%',
  },
  containerLeftToggle: {
    width: '85%',
  },
  containerRight: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
