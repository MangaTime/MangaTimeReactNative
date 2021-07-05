import React from 'react';
import { FlatList, Button, SafeAreaView, View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ReduxThunk from 'redux-thunk';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';

export const MangaDetail = () => {
    const mangaDetail = useAppSelector((state) => state.mangaReducer.mangaDetail)
    const dispatch = useAppDispatch();
    if (mangaDetail)
        return (
            <View>
                <Image
                    resizeMode="contain"
                    style={styles.thumbnail}
                    source={{
                        uri: `https://uploads.mangadex.org/covers/${mangaDetail.id}/${mangaDetail.cover_art}.256.jpg`,
                    }}
                />
                <Text style={styles.mangaName}>{mangaDetail.name}</Text>
                <FlatList
                    data={mangaDetail.volumes}
                    keyExtractor={(item, index) => item.name}
                    renderItem={({ item }) =>
                        <View>
                            <Text>Volume {item.name}</Text>
                            <FlatList
                                data={item.chapters}
                                keyExtractor={(item, index) => item.name}
                                renderItem={({ item }) =>
                                    <Text>Chapter {item.name}</Text>
                                }
                            />
                        </View>
                    }
                />
            </View>
        );
    else
        return (
            <Text>Empty</Text>
        );
};
const styles = StyleSheet.create({
    mangaName: {
        width: "100%"
    },
    thumbnail: {
        width: "100%",
        height: 75,
    }
});
