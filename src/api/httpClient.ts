import axios, {
    CancelToken as AxiosCancelToken,
    AxiosError,
    AxiosRequestConfig,
  } from 'axios';
  import {store, actions, selectors} from 'store';  
  export type CancelToken = AxiosCancelToken;
  export type RequestError<
    T = {message: string; statusCode: number; error: string}
  > = AxiosError<T>;
  export type RequestConfig = AxiosRequestConfig;
  
  const httpClient = axios.create({
    baseURL: 'https://baseballcloud-back.herokuapp.com/api/v1',
    withToken: true,
  });
  
  httpClient.interceptors.request.use((config) => {
    if (!config.withToken) {
      return config;
    }
    const state = store?.getState();
    const accessToken = state ? selectors.auth.selectAccessToken(state) : null;
  
    if (!accessToken) {
      return config;
    }
  
    const headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  
    return {...config, headers};
  });
  
  httpClient.interceptors.response.use(
    (response) => {
      if (response.data.severity === 'ERROR') {
        throw new Error(response.data.message);
      }
  
      return response;
    },
    (error) => {
      const config = error.config as RequestConfig;
  
      if (!config.withToken) {
        throw error;
      }
  
      if (error.response) {
        if (error.response.status === 401) {
          if (store) {
            // @ts-ignore
            store.dispatch(actions.auth.signOut());
          }
        } else {
          throw error;
        }
        throw error.response.data;
      }
  
      if (error.data) {
        throw error.data;
      }
  
      throw error;
    },
  );
  
  export const createSourceCancelToken = () => {
    return axios.CancelToken.source();
  };
  
  export default httpClient;