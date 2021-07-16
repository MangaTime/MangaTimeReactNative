import { ReactElement, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Appbar, IconButton, Searchbar, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';

export const Browse = (): ReactElement => {
  const { colors, dark } = useTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query: string): void => setSearchQuery(query);
  interface Entry {
    title: string;
    key: string;
    icon: string;
    callback: () => void;
  }
  const entryList: Entry[] = [
    {
      title: 'Recently Updated',
      key: 'recentlyUpdated',
      icon: 'history',
      callback: () => console.log('aaa'),
    },
    {
      title: 'Following',
      key: 'following',
      icon: 'favorite-border',
      callback: () => console.log('aaa'),
    },
    {
      title: 'Recently Added',
      key: 'recentlyAdded',
      icon: 'playlist-add',
      callback: () => console.log('aaa'),
    },
    {
      title: 'Random',
      key: 'random',
      icon: 'help-outline',
      callback: () => console.log('aaa'),
    },
  ];

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
      <Appbar
        style={{ paddingHorizontal: 24, justifyContent: 'space-between' }}>
        {/* <IconButton
          disabled
          icon="book-open-page-variant"
          color={colors.primary}
        /> */}
        {/* <Appbar.Content style={{ borderColor: 'black', borderWidth: 1 }}> */}
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
        {/* </Appbar.Content> */}
        <IconButton
          icon="playlist-check"
          color={colors.text}
          style={{
            ...styles.buttonRightIcon,
            ...{ backgroundColor: colors.primary, borderColor: colors.text },
          }}
          onPress={() => console.log('test')}
        />
      </Appbar>
      <FlatList
        style={styles.buttonList}
        data={entryList}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              ...styles.button,
              backgroundColor: colors.primary,
            }}
            onPress={item.callback}>
            <Icon name={item.icon} size={24} color={colors.text} />
            <Text style={{ ...styles.buttonText, color: colors.text }}>
              {item.title}
            </Text>
            <Icon
              name="chevron-right"
              size={24}
              color={colors.text}
              // style={{ backgroundColor: 'blue' }}
            />
          </TouchableOpacity>
        )}
      />
    </>
  );
};
const styles = StyleSheet.create({
  //   appBar: { marginLeft: 0, textAlign: 'center' },
  searchBox: {
    borderRadius: 20,
    flex: 1,
    height: 40,
    alignItems: 'center',
  },
  searchBoxInput: { fontSize: 14 },
  statusBarColor: { width: '100%' },
  buttonRightIcon: {
    // alignSelf: 'flex-end',
  },
  buttonList: {
    paddingTop: 4,
  },
  button: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 24,
    marginVertical: 8,
  },
  buttonText: {
    flex: 1,
    fontSize: 20,
    marginHorizontal: 8,
  },
});
