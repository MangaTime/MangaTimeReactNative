import { ReactElement } from 'react';
import { useAppSelector } from '../../redux/Hooks';
import { LoginForm } from './LoginForm';
import { LogoutForm } from './LogoutForm';

export const AuthForm = (): ReactElement => {
  const user = useAppSelector((state) => state.persist.user);
  if (!user.loggedIn) return <LoginForm />;
  else return <LogoutForm />;
};
