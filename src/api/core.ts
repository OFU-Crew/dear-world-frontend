import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.dear-world.live/api/v1',
  timeout: 30000,
});

export const getApi = (url: string, config = {}) =>
  axiosInstance.get(url, config).then(response => response.data);

export const postApi = (url: string, data: any = {}, config = {}) =>
  axiosInstance.post(url, data, config).then(response => response.data);
