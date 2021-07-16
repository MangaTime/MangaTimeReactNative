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
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BrowseStackParamList } from '../../Navigator/BrowseStack/paramList';

type BrowseScreenNavigationProp = NativeStackNavigationProp<
  BrowseStackParamList,
  'ListMangaView'
>;

// type BrowseScreenRouteProp = RouteProp<BrowseStackParamList, 'ListMangaView'>;

type Props = {
  // route: BrowseScreenRouteProp;
  navigation: BrowseScreenNavigationProp;
};

export const Browse = ({ navigation }: Props): ReactElement => {
  const { colors, dark } = useTheme();
  const insets = useSafeAreaInsets();
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
      callback: () => {
        navigation.navigate('ListMangaView', {
          routeName: 'Recently Updated',
          routeId: 'recentlyUpdated',
        });
      },
    },
    {
      title: 'Following',
      key: 'following',
      icon: 'favorite-border',
      callback: () => {
        navigation.navigate('ListMangaView', {
          routeName: 'Following',
          routeId: 'following',
        });
      },
    },
    {
      title: 'Recently Added',
      key: 'recentlyAdded',
      icon: 'playlist-add',
      callback: () => {
        navigation.navigate('ListMangaView', {
          routeName: 'Following',
          routeId: 'following',
        });
      },
    },
    {
      title: 'Random',
      key: 'random',
      icon: 'help-outline',
      callback: () => {
        navigation.navigate('ListMangaView', {
          routeName: 'Following',
          routeId: 'following',
        });
      },
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
        <IconButton
          icon="playlist-check"
          color={colors.text}
          style={{
            ...styles.buttonRightIcon,
            ...{ backgroundColor: colors.primary },
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
  appBar: { paddingHorizontal: 24, justifyContent: 'space-between' },
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
