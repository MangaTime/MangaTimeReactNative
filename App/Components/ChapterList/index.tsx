import React, { ReactElement } from 'react';

import { FlatList, Text } from 'react-native';
import { Chapter, Volume } from '../../redux/Manga/interfaces';

interface ChapterListProps {
  volume: Volume;
  itemCallback: (arg: Chapter) => void;
}

export const ChapterList: React.FC<ChapterListProps> = ({
  volume,
  itemCallback,
}: ChapterListProps): ReactElement => {
  if (volume.chapters) {
    return (
      <FlatList
        data={volume.chapters as Chapter[]}
        keyExtractor={(chapter) => chapter.name}
        renderItem={(chapter) => (
          <Text onPress={() => itemCallback(chapter.item)}>
            Chapter {chapter.item.name}
          </Text>
        )}
      />
    );
  } else {
    return <Text>No chapter at the moment</Text>;
  }
};
