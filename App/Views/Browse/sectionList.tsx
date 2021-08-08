import { ReactElement, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { TogglableView } from '../../Components/TogglableView';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import {
  Section,
  updateSections,
  updateSectionVisibility,
} from '../../redux/AppSettings/appSettingsReducer';
import { useNavigation } from '@react-navigation/native';
import { SectionListFooter } from './sectionListFooter';
import AppViews from '../../Navigator/AppViews';
type Props = {
  isEditingVisibility: boolean;
};

export const SectionList = ({ isEditingVisibility }: Props): ReactElement => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { colors, dark } = useTheme();
  const sections = useAppSelector((state) => state.persist.appSetting.sections);

  interface Entry extends Section {
    title: string;
    icon: string;
    callback: () => void;
  }
  const entryList: Entry[] = [
    {
      title: 'Recently Updated',
      key: 'recentlyUpdated',
      icon: 'history',
      isVisible: true,
      callback: () => {
        navigation.navigate(AppViews.LIST_MANGA_VIEW, {
          routeName: 'Recently Updated',
          routeId: 'recentlyUpdated',
        });
      },
    },
    {
      title: 'Following',
      key: 'following',
      icon: 'favorite-border',
      isVisible: true,
      callback: () => {
        navigation.navigate(AppViews.LIST_MANGA_VIEW, {
          routeName: 'Following',
          routeId: 'following',
        });
      },
    },
    {
      title: 'Recently Added',
      key: 'recentlyAdded',
      icon: 'playlist-add',
      isVisible: true,
      callback: () => {
        navigation.navigate(AppViews.LIST_MANGA_VIEW, {
          routeName: 'Recently Added',
          routeId: 'recentlyAdded',
        });
      },
    },
    {
      title: 'Random',
      key: 'random',
      icon: 'help-outline',
      isVisible: true,
      callback: () => {
        navigation.navigate(AppViews.LIST_MANGA_VIEW, {
          routeName: 'Random',
          routeId: 'random',
        });
      },
    },
  ];

  const sortEntryList = () => {
    return sections
      .map((e) => {
        return { ...(entryList.find((e1) => e.key == e1.key) as Entry), ...e };
      })
      .filter((x): x is Entry => x != null);
  };
  let sortedEntryList = sortEntryList();
  useEffect(() => {
    sortedEntryList = sortEntryList();
  }, [sections]);

  return (
    <View style={styles.container}>
      <DraggableFlatList
        style={styles.buttonList}
        data={sortedEntryList}
        keyExtractor={(item) => item.key}
        onDragEnd={({ data }) => {
          dispatch(
            updateSections(
              data.map((e) => ({ key: e.key, isVisible: e.isVisible })),
            ),
          );
        }}
        renderItem={({ item, drag }) => (
          <TogglableView
            Component={
              <TouchableOpacity
                style={{
                  ...styles.button,
                  backgroundColor: colors.primary,
                }}
                onPressIn={isEditingVisibility ? drag : undefined}
                onPress={isEditingVisibility ? undefined : item.callback}>
                <Icon name={item.icon} size={24} color={colors.text} />
                <Text style={{ ...styles.buttonText, color: colors.text }}>
                  {item.title}
                </Text>
                <Icon name="chevron-right" size={24} color={colors.text} />
              </TouchableOpacity>
            }
            onChangeCallback={(status) =>
              dispatch(
                updateSectionVisibility({ key: item.key, isVisible: status }),
              )
            }
            isShowingToggle={isEditingVisibility}
            toggleValue={item.isVisible}
          />
        )}
        ListFooterComponent={isEditingVisibility ? <SectionListFooter /> : null}
      />
    </View>
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
  container: {
    flex: 1,
  },
  buttonList: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  button: {
    flexDirection: 'row',
    borderRadius: 8,
  },
  buttonText: {
    flex: 1,
    fontSize: 18,
    marginHorizontal: 8,
  },
});
