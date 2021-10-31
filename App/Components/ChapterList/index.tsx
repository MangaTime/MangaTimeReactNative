import { ReactElement } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { Chapter } from '../../redux/Manga/interfaces';

interface ChapterListProps {
  chapters: Chapter[];
  itemCallback: (arg: Chapter) => void;
  styles: Record<string, unknown>;
}

export const ChapterList = ({
  chapters,
  itemCallback,
  styles,
}: ChapterListProps): ReactElement => {
  if (chapters) {
    return (
      <FlatList
        data={chapters}
        keyExtractor={(chapter) => chapter.name + chapter}
        renderItem={(chapter) => (
          <TouchableOpacity onPress={() => itemCallback(chapter.item)}>
            <Text style={styles}>Chapter {chapter.item.name} {chapter.item.title?`- ${chapter.item.title}`:''}</Text>
          </TouchableOpacity>
        )}
      />
    );
  } else {
    return <Text>No chapter at the moment</Text>;
  }
};
