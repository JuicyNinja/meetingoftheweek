import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const instance: AxiosInstance = axios.create();

// Add a request interceptor to attach the authorization token to requests
instance.interceptors.request.use(
  function(config: any) {
    const token: string | null = localStorage.getItem('site'); // Assuming you store the token in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default instance;
