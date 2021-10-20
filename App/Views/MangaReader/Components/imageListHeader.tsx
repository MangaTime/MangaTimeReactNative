import { Picker } from '@react-native-picker/picker';
import { ReactElement, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, ProgressBar, useTheme } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../../redux/Hooks';
import { loadChapter } from '../../../redux/Manga/mangaReducer';

interface Props {
  readingProgress: number;
}
export const ImageListHeader = ({ readingProgress }: Props): ReactElement => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const mangaDetail = useAppSelector((state) => state.manga.mangaDetail);
  const chapterDetail = useAppSelector((state) => state.manga.readingChapter);

  const [selectedChapter, setSelectedChapter] = useState(chapterDetail?.id);

  const previousChapter = (shouldNavigate = false): boolean => {
    if (mangaDetail && mangaDetail.chapters && chapterDetail)
      for (let i = 0; i < mangaDetail.chapters.length; i++)
        if (
          parseFloat(mangaDetail.chapters[i].name) <
          parseFloat(chapterDetail.name)
        ) {
          if (shouldNavigate) dispatch(loadChapter(mangaDetail.chapters[i]));
          return true;
        }

    return false;
  };

  const nextChapter = (shouldNavigate = false): boolean => {
    if (mangaDetail && mangaDetail.chapters && chapterDetail)
      for (let i = mangaDetail.chapters.length - 1; i >= 0; i--)
        if (
          parseFloat(mangaDetail.chapters[i].name) >
          parseFloat(chapterDetail.name)
        ) {
          if (shouldNavigate) dispatch(loadChapter(mangaDetail.chapters[i]));
          return true;
        }

    return false;
  };

  const chapterList = mangaDetail?.chapters?.map((chapter) => (
    <Picker.Item
      key={chapter.id}
      label={`${chapter.name} - ${chapter.title}`}
      value={`${chapter.id}`}
    />
  ));
  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <Picker
          style={{ ...styles.chapterPicker, color: colors.text }}
          itemStyle={{ color: colors.text }}
          dropdownIconColor={colors.text}
          selectedValue={selectedChapter}
          onValueChange={(itemValue, itemIndex) => {
            if (mangaDetail && mangaDetail.chapters) {
              dispatch(loadChapter(mangaDetail.chapters[itemIndex]));
              setSelectedChapter(itemValue);
            }
          }}>
          {chapterList}
        </Picker>
        <IconButton
          icon="chevron-left"
          color={colors.text}
          style={{ backgroundColor: colors.accent }}
          disabled={!previousChapter()}
          onPress={() => previousChapter(true)}
        />
        <IconButton
          icon="chevron-right"
          color={colors.text}
          style={{ backgroundColor: colors.accent }}
          disabled={!nextChapter()}
          onPress={() => nextChapter(true)}
        />
      </View>

      <ProgressBar
        progress={readingProgress}
        color={colors.accent}
        style={{ position: 'absolute', bottom: -5, height: 5 }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  chapterPicker: { flex: 1 },
  headerContainer: {
    height: '100%',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 16,
  },
});
