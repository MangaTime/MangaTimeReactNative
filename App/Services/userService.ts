import axios from 'axios';
import client from './baseClient';

export const login = async (username: string, password: string) => {
  return client.post('/auth/login', {
    username,
    password,
  });
};

export const logout = async () => {
  return client.post('/auth/logout');
};
