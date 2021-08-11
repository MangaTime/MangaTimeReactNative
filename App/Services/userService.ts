import client from './baseClient';
import { components } from './MangaSources/MangaDex/mangadex';

// TODO: create uniform authorization object
export const login = async (
  username: string,
  password: string,
): Promise<components['schemas']['LoginResponse']> => {
  return client.post('/auth/login', {
    username,
    password,
  });
};

export const logout = async (): Promise<
  components['schemas']['LogoutResponse']
> => {
  return client.post('/auth/logout');
};

export const refreshToken = async (
  token: string,
): Promise<components['schemas']['RefreshResponse']> => {
  return client.post('/auth/refresh', {
    token,
  });
};
