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

cardsInstance.interceptors.response.use(
  config => {
    return config;
  },
  async error => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const { data } = await axios.post('/api/auth/current', {
          token: refreshToken,
        });
        localStorage.setItem('token', data.accessToken);
        return authInstance.request(originalRequest);
      } catch (error) {
        console.log('Not authorized');
      }
    }
    throw error;
  }
);

boardInstance.interceptors.response.use(
  config => {
    return config;
  },
  async error => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const { data } = await axios.post('/api/auth/current', {
          token: refreshToken,
        });
        localStorage.setItem('token', data.accessToken);
        return authInstance.request(originalRequest);
      } catch (error) {
        console.log('Not authorized');
      }
    }
    throw error;
  }
);

columnInstance.interceptors.response.use(
  config => {
    return config;
  },
  async error => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const { data } = await axios.post('/api/auth/current', {
          token: refreshToken,
        });
        localStorage.setItem('token', data.accessToken);
        return authInstance.request(originalRequest);
      } catch (error) {
        console.log('Not authorized');
      }
    }
    throw error;
  }
);

boardInstance.interceptors.response.use(
  config => {
    return config;
  },
  async error => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const { data } = await axios.post('/api/auth/current', {
          token: refreshToken,
        });
        localStorage.setItem('token', data.accessToken);
        return authInstance.request(originalRequest);
      } catch (error) {
        console.log('Not authorized');
      }
    }
    throw error;
  }
);
