import { ReactElement, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { Title, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SupportedSources from '../../../../Services/MangaSources/supportedSources';

interface LoginModalProps <K extends keyof SupportedSources>{
  isVisible: boolean;
  setModal: (value: boolean) => void;
  modalPrimaryAction: (username: string, password: string) => void;
  service: K;
}

export const LoginModal = <K extends keyof SupportedSources>({
  isVisible,
  setModal,
  modalPrimaryAction,
  service
}: LoginModalProps<K>): ReactElement => {
  const { colors } = useTheme();
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  return (
    <Modal
      isVisible={isVisible}
      useNativeDriver
      onBackdropPress={() => setModal(false)}
      onBackButtonPress={() => setModal(false)}>
      <View style={[styles.container, { backgroundColor: colors.primary }]}>
        <Title style={styles.title}>Login to {service}</Title>
        <View
          style={[
            styles.inputContainer,
            { backgroundColor: colors.background },
          ]}>
          <Icon
            name="account-circle"
            size={24}
            color={colors.text}
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="user name"
            onChangeText={setUsername}
            value={username}
            style={[styles.inputText, { color: colors.text }]}
            placeholderTextColor={colors.primary}
          />
        </View>
        <View
          style={[
            styles.inputContainer,
            { backgroundColor: colors.background },
          ]}>
          <Icon
            name="vpn-key"
            size={24}
            color={colors.text}
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="password"
            onChangeText={setPassword}
            value={password}
            style={[styles.inputText, { color: colors.text }]}
            placeholderTextColor={colors.primary}
            secureTextEntry
          />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.loginButton, { backgroundColor: colors.background }]}
            onPress={() => modalPrimaryAction(username, password)}>
            <Text style={{ color: colors.text }}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.cancelButton, { borderColor: colors.background }]}
            onPress={() => setModal(false)}>
            <Text style={{ color: colors.text }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: { padding: 16, borderRadius: 20 },
  inputContainer: {
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    flexDirection: 'row',
    marginBottom: 16,
  },
  title: { marginBottom: 16, alignSelf: 'center' },
  inputText: { padding: 0, flex: 1 },
  inputIcon: { marginRight: 16 },
  cancelButton: {
    height: 56,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginLeft: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  loginButton: {
    height: 56,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
});
