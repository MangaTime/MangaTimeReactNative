import React from 'react';
import {
  FlatList,
  Button,
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAppDispatch, useAppSelector } from '../../../redux/Hooks';
import { logoutThunk } from '../../../redux/User/userReducer';

export const LogoutForm = () => {
  const user = useAppSelector((state) => state.persist.user);
  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch(logoutThunk());
  };
  return (
    <View>
      <Text>{user.username}</Text>
      <Button onPress={logout} title="Logout" />
    </View>
  );
};
const styles = StyleSheet.create({});
