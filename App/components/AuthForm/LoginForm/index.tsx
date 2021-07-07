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
import { loginThunk } from '../../../redux/User/userReducer';

export const LoginForm = () => {
  //   const mangaDetail = useAppSelector((state) => state.mangaReducer.mangaDetail);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useAppDispatch();
  const login = () => {
    dispatch(loginThunk({ username, password }));
  };
  return (
    <View>
      <TextInput
        mode="outlined"
        label="Username"
        textContentType="username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        mode="outlined"
        label="Password"
        textContentType="password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <Button onPress={login} title="Login" />
    </View>
  );
};
const styles = StyleSheet.create({});
