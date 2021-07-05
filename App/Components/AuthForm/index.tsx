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
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import { LoginForm } from './LoginForm';
import { LogoutForm } from './LogoutForm';

export const AuthForm = () => {
  const user = useAppSelector((state) => state.persist.user);
  const dispatch = useAppDispatch();
  if (!user.loggedIn) return <LoginForm />;
  else return <LogoutForm />;
};
const styles = StyleSheet.create({});
