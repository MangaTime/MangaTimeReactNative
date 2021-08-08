import { AxiosResponse } from 'axios';
import { updateToken } from '../redux/User/userReducer';
import { components } from './mangadex';

export default (client: any, store: any) => {
  const addAuthHeader = (originalConfig: any): any => {
    let config = { ...originalConfig };
    const { sessionToken } = store.getState().persist.user;
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
    const { refreshToken } = store.getState().persist.user;
    return client
      .post('/auth/refresh', {
        token: refreshToken,
      })
      .then((response: components['schemas']['RefreshResponse']) => {
        store.dispatch(
          updateToken({
            session: response?.token?.session,
            refresh: response?.token?.refresh,
          }),
        );
      })
      .catch(function () {
        store.dispatch(updateToken({}));
      });
  };
  const onFulfilledRequest = addAuthHeader;
  const onRejectedResponse = async (error: any): any => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshAccessToken();

      return client(addAuthHeader(originalRequest));
    }
    return Promise.reject(error);
    throw error;
  };
  const onResolvedResponse = (response: AxiosResponse<unknown>): unknown =>
    response.data;
  client.interceptors.request.use(onFulfilledRequest);
  client.interceptors.response.use(onResolvedResponse, onRejectedResponse);
};
