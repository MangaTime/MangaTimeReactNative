import { EnhancedStore } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../../../redux/store';
import { ServiceAuthenticationInformation } from '../../../redux/User/interfaces';
import { BaseUserRequests } from '../baseMangaSource';
import SupportedSources from '../supportedSources';
import client from './client';
import { components } from './mangadex';

const refreshToken = async (
  token: string,
): Promise<components['schemas']['RefreshResponse']> => {
  return client.post('/auth/refresh', {
    token,
  });
};

export const userRequests: BaseUserRequests = {
  login: async ({
    username,
    password,
  }): Promise<ServiceAuthenticationInformation | undefined> => {
    return client.post('/auth/login', {
      username,
      password,
    });
  },
  logout: async (service: keyof SupportedSources): Promise<unknown> => {
    return client.post('/auth/logout');
  },
  clientInterceptor: (
    client: AxiosInstance,
    store: EnhancedStore<RootState>,
  ) => {
    return null;
  },
};
