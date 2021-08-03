import { ReactElement, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Appbar, IconButton, Searchbar, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SectionList } from './sectionList';

export const Browse = (): ReactElement => {
  const { colors, dark } = useTheme();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query: string): void => setSearchQuery(query);

  return (
    <>
      <View
        style={[
          styles.statusBarColor,
          {
            backgroundColor: colors.accent,
            height: insets.top,
          },
        ]}
      />
      <StatusBar
        backgroundColor="transparent"
        barStyle={!dark ? 'dark-content' : 'light-content'}
        translucent
      />
      <Appbar style={styles.appBar}>
        <Searchbar
          placeholder="Search"
          icon={() => (
            <Icon name="search" size={20} color={colors.placeholder} />
          )}
          inputStyle={styles.searchBoxInput}
          style={styles.searchBox}
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </Appbar>

      <SectionList isEditingVisibility={false} />
    </>
  );
};
const styles = StyleSheet.create({
  appBar: { paddingHorizontal: 24, justifyContent: 'space-between' },
  searchBox: {
    borderRadius: 20,
    flex: 1,
    height: 40,
    alignItems: 'center',
  },
  searchBoxInput: { fontSize: 14 },
  statusBarColor: { width: '100%' },
});
