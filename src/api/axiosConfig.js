import axios from 'axios';

const baseURL = 'https://taskpro-final-project.onrender.com';

export const authInstance = axios.create({
  baseURL: `${baseURL}/auth`,
});

export const boardInstance = axios.create({
  baseURL: `${baseURL}/api/board`,
});

export const columnInstance = axios.create({
  baseURL: `${baseURL}/api/column`,
});

export const cardsInstance = axios.create({
  baseURL: `${baseURL}/api/card`,
});

authInstance.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

boardInstance.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

columnInstance.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

cardsInstance.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});
