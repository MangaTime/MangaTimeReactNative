import { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useAppDispatch } from '../../../redux/Hooks';
import { loginThunk } from '../../../redux/User/userReducer';

export const LoginForm = () => {
  //   const mangaDetail = useAppSelector((state) => state.mangaReducer.mangaDetail);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const login = () => {
    dispatch(loginThunk({source:'MangaDex', username, password }));
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
