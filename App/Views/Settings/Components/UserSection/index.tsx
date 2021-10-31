import { ReactElement, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Title, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAppDispatch, useAppSelector } from '../../../../redux/Hooks';
import { loginThunk, logoutThunk } from '../../../../redux/User/userReducer';
import SupportedSources from '../../../../Services/MangaSources/supportedSources';
import { baseColors } from '../../../../Theme/baseColors';
import { LoginModal } from '../LoginModal';
import { SectionTitle } from '../SectionTitle';

interface IProps<K extends keyof SupportedSources> {
  service: K;
}
export const UserSection = <K extends keyof SupportedSources>({service}: IProps<K>): ReactElement => {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const [modal, setModal] = useState(false);
  const { user } = useAppSelector((state) => state.persist);
  const serviceSpecificUserState = user[service];
  const handleLogin = (username: string, password: string): void => {
    dispatch(loginThunk({ source:service, username, password }));
    setModal(false);
  };
  const handleLogout = (): void => {
    dispatch(logoutThunk({source:service}));
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
              {service} - {serviceSpecificUserState ? serviceSpecificUserState.login.username : 'Login to sync your data'}
            </Title>
          </View>
          <Button
            onPress={serviceSpecificUserState ? handleLogout : () => setModal(true)}
            mode="contained"
            style={[styles.button, { backgroundColor: colors.accent }]}>
            {serviceSpecificUserState ? 'Log out' : 'Login'}
          </Button>
        </View>
      </View>
      <LoginModal
        isVisible={modal}
        setModal={setModal}
        modalPrimaryAction={handleLogin}
        service={service}
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
