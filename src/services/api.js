import axios from 'axios';

const dev_url = 'http://192.168.0.115:3333';
// const prod_url = 'https://api.hclweb.com.br';

let token = '';

const api = axios.create({
  baseURL: dev_url,
});

api.interceptors.request.use(
  async config => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export function setToken(data) {
  token = data;
}

export default api;
