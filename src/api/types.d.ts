// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as axios from 'axios';
declare module 'axios' {
  interface AxiosRequestConfig {
    withToken?: boolean;
  }
}