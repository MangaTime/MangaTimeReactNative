import { ReactElement } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { Chapter, Volume } from '../../redux/Manga/interfaces';

interface ChapterListProps {
  volume: Volume;
  itemCallback: (arg: Chapter) => void;
  styles: Record<string, unknown>;
}

export const ChapterList = ({
  volume,
  itemCallback,
  styles,
}: ChapterListProps): ReactElement => {
  if (volume.chapters) {
    return (
      <FlatList
        data={volume.chapters as Chapter[]}
        keyExtractor={(chapter) => chapter.name}
        renderItem={(chapter) => (
          <TouchableOpacity onPress={() => itemCallback(chapter.item)}>
            <Text style={styles}>Chapter {chapter.item.name}</Text>
          </TouchableOpacity>
        )}
      />
    );
  } else {
    return <Text>No chapter at the moment</Text>;
  }
};
