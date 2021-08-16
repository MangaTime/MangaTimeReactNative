import { AxiosResponse } from 'axios';
import { updateToken } from '../../../redux/User/userReducer';
import { BaseMangaSource } from '../baseMangaSource';
import serviceSpecificClient from './client';
import { mangaRequests } from './manga';
import { components } from './mangadex';
import { userRequests } from './user';

export const MangaDexSource: BaseMangaSource = {
  manga: mangaRequests,
  user: userRequests,
  client: {
    client:serviceSpecificClient,
    clientInterceptor: (client, store) =>{
      const addAuthHeader = (originalConfig: any): any => {
        let config = { ...originalConfig };
        const sessionToken = store.getState().persist.user.MangaDex?.additional.sessionToken;
        if (sessionToken) {
          const authHeader = { Authorization: `Bearer ${sessionToken}` };
          config = {
            ...config,
            headers: {
              ...config.headers,
              ...authHeader,
            },
          };
        }
        return config;
      };
      const refreshAccessToken = async (): Promise<any> => {
        const refreshToken = store.getState().persist.user.MangaDex?.additional.sessionToken;
        return (client
          .post('/auth/refresh', {
            token: refreshToken,
          }) as Promise<components['schemas']['RefreshResponse']>)
          .then((response: components['schemas']['RefreshResponse']) => {
            store.dispatch(
              updateToken({
                source: 'MangaDex',
                session: response?.token?.session,
                refresh: response?.token?.refresh,
              }),
            );
          })
          .catch(function () {
            store.dispatch(updateToken({source:'MangaDex'}));
          });
      };
      const onFulfilledRequest = addAuthHeader;
      const onRejectedResponse = async (error: any): Promise<any> => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          await refreshAccessToken();
    
          return client(addAuthHeader(originalRequest));
        }
        return Promise.reject(error);
      };
      const onResolvedResponse = (response: AxiosResponse<any>): any =>
        response.data;
      client.interceptors.request.use(onFulfilledRequest);
      client.interceptors.response.use(onResolvedResponse, onRejectedResponse);
    }
  }
};
