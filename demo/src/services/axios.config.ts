import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { UserStorage } from '@demo/utils/user-storage';

const isAbsoluteUrl = (url: string): boolean => {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};

export const axiosInstance = axios.create({
  baseURL: '/',
});

axiosInstance.interceptors.request.use(async function (config) {
  try {
    // const token = await UserStorage.getToken();
    if (!config.headers) {
      config.headers = {};
    }
    // config.headers.authorization = token;

    // Disable baseURL if absolute URL is provided
    if (config.url && isAbsoluteUrl(config.url)) {
      config.baseURL = '';
    }
  } catch (error) {
    // window.location.assign(LOGIN_ADDRESS);
  } finally {
    return config;
  }
});

axiosInstance.interceptors.response.use(
  function <T>(res: AxiosResponse<T>) {
    return new Promise(resolve => resolve(res));
  },
  error => {
    throw {
      ...error,
      message: error?.response?.data?.message || error?.message || error,
    };
  },
);

export const request = {
  async get<T>(url: string, config?: AxiosRequestConfig) {
    return axiosInstance
      .get<T>(url, {
        ...config,
        baseURL: isAbsoluteUrl(url) ? '' : '/',
      })
      .then(data => data.data);
  },
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return axiosInstance
      .post<T>(url, data, {
        ...config,
        baseURL: isAbsoluteUrl(url) ? '' : '/',
      })
      .then(data => data.data);
  },
};
