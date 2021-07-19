import { ReactElement, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Title, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAppDispatch, useAppSelector } from '../../../../redux/Hooks';
import { loginThunk, logoutThunk } from '../../../../redux/User/userReducer';
import { baseColors } from '../../../../Theme/baseColors';
import { LoginModal } from '../LoginModal';
import { SectionTitle } from '../SectionTitle';

export const UserSection = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const [modal, setModal] = useState(false);
  const { user } = useAppSelector((state) => state.persist);

  const handleLogin = (username: string, password: string): void => {
    dispatch(loginThunk({ username, password }));
    setModal(false);
  };
  const handleLogout = (): void => {
    dispatch(logoutThunk());
  };

  return (
    <>
      <View style={styles.container}>
        <SectionTitle title="User" />
        <View
          style={[styles.userContainer, { backgroundColor: colors.primary }]}>
          <View style={styles.titleContainer}>
            <Icon
              name="account-circle"
              size={24}
              style={[styles.icon, { color: colors.text }]}
            />
            <Title>
              {user.sessionToken ? user.username : 'Login to sync your data'}
            </Title>
          </View>
          <Button
            onPress={user.sessionToken ? handleLogout : () => setModal(true)}
            mode="contained"
            style={[styles.button, { backgroundColor: colors.accent }]}>
            {user.sessionToken ? 'Log out' : 'Login'}
          </Button>
        </View>
      </View>
      <LoginModal
        isVisible={modal}
        setModal={setModal}
        modalPrimaryAction={handleLogin}
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  userContainer: {
    padding: 16,
    borderRadius: 10,
    shadowColor: baseColors.black.dark,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon: { marginRight: 16 },
  button: {
    borderRadius: 20,
    marginTop: 16,
  },
});
