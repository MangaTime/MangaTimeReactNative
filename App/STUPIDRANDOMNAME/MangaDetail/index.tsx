import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useAppSelector } from '../../redux/Hooks';

export const MangaDetail: React.FC = () => {
  const mangaDetail = useAppSelector((state) => state.mangaReducer.mangaDetail);
  if (mangaDetail)
    return (
      <View>
        <Image
          accessibilityIgnoresInvertColors
          resizeMode="contain"
          style={styles.thumbnail}
          source={{
            uri: `https://uploads.mangadex.org/covers/${mangaDetail.id}/${mangaDetail.cover_art}.256.jpg`,
          }}
        />
        <Text style={styles.mangaName}>{mangaDetail.name}</Text>
        <FlatList
          data={mangaDetail.volumes}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View>
              <Text>Volume {item.name}</Text>
              <FlatList
                data={item.chapters}
                keyExtractor={(item, index) => item.name}
                renderItem={({ item }) => <Text>Chapter {item.name}</Text>}
              />
            </View>
          )}
        />
      </View>
    );
  else return <Text>Empty</Text>;
};
const styles = StyleSheet.create({
  mangaName: {
    width: '100%',
  },
  thumbnail: {
    width: '100%',
    height: 75,
  },
});
