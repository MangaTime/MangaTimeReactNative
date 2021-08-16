import { ServiceAuthenticationInformation } from '../../../redux/User/interfaces';
import { BaseUserRequests } from '../baseMangaSource';
import client from './client';
import { components } from './mangadex';

export const userRequests: BaseUserRequests = {
  login: async ({
    username,
    password,
  }): Promise<ServiceAuthenticationInformation | undefined> => {
    return (client.post('/auth/login', {
      username,
      password,
    }) as Promise<components['schemas']['LoginResponse']>).then((response) => {
      return {
        login: {
          username,
          password
        },
        additional:{
          sessionToken: response.token?.session,
          refreshToken: response.token?.refresh
        }
      }
    });
  },
  logout: async (): Promise<unknown> => {
    return client.post('/auth/logout');
  },
};
