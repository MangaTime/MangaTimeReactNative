import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { BaseMangaSource } from '../baseMangaSource'; 
import serviceSpecificClient from './client';
import { mangaRequests } from './manga';
import { components } from './mangadex';
import { userRequests } from './user';  

export const MangaDexSource: BaseMangaSource = {
  manga: mangaRequests,
  user: userRequests,
  client: {
    client: serviceSpecificClient,
    clientInterceptor: (client, store, updateStateFunction) => {
      const addAuthHeader = (originalConfig: any): any => {
        let config = { ...originalConfig };
        const sessionToken =
          store.getState().persist.user.MangaDex?.additional.sessionToken;
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
        const refreshToken =
          store.getState().persist.user.MangaDex?.additional.refreshToken;
          const password =
          store.getState().persist.user.MangaDex?.login.password;
          const username =
          store.getState().persist.user.MangaDex?.login.username;
        return (
          client.post('/auth/refresh', {
            token: refreshToken,
          }) as Promise<components['schemas']['RefreshResponse']>
        )
          .then((response: components['schemas']['RefreshResponse']) => {
            store.dispatch(
              updateStateFunction({
                source: 'MangaDex',
                additionalData:{
                  session: response?.token?.session,
                  refresh: response?.token?.refresh,
                }
              }),
            );
          })
          .catch(()=>userRequests.login?.({password,username})?.then((response)=>{
            store.dispatch(
              updateStateFunction({
                source: 'MangaDex',
                additionalData: response?.additional
              }),
            );
          }).catch(()=>{
            store.dispatch(
              updateStateFunction({
                source: 'MangaDex',
                logout: true
              }),
            );
          }));
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
    },
  },
};
