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

const addTokenToRequest = config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

authInstance.interceptors.request.use(addTokenToRequest);
boardInstance.interceptors.request.use(addTokenToRequest);
columnInstance.interceptors.request.use(addTokenToRequest);
cardsInstance.interceptors.request.use(addTokenToRequest);

const handleTokenRefresh = async error => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._isRetry) {
    originalRequest._isRetry = true;
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const { data } = await axios.post(`${baseURL}/auth/current`, {
        token: refreshToken,
      });
      localStorage.setItem('token', data.accessToken);
      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
      return axios(originalRequest);
    } catch (error) {
      console.log('Not authorized');
    }
  }
  throw error;
};
cardsInstance.interceptors.response.use(
  response => response,
  handleTokenRefresh
);
boardInstance.interceptors.response.use(
  response => response,
  handleTokenRefresh
);
columnInstance.interceptors.response.use(
  response => response,
  handleTokenRefresh
);
authInstance.interceptors.response.use(
  response => response,
  handleTokenRefresh
);
