export default (client: any, store: any) => {
  const onFulfilledRequest = (originalConfig: any): any => {
    let config = { ...originalConfig };
    const { sessionToken } = store.getState().persist.user;
    console.log(sessionToken);
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
  const onRejectedResponse = (error: any): any => {
    throw error;
  };
  const onResolvedResponse = (response: any) => response.data;
  client.interceptors.request.use(onFulfilledRequest);
  client.interceptors.response.use(onResolvedResponse, onRejectedResponse);
};
