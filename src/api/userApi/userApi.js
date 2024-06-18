import { authInstance } from '../axiosConfig';

export const changeUserThemeApi = async (id, theme) => {
  try {
    const response = await authInstance.put(`/${id}`, theme);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getUserBoardInfo = async () => {
  try {
    const response = await authInstance.get('/data');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const changeUserProfileApi = async (id, data) => {
  try {
    const response = await authInstance.put(`/${id}`, data);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const changeUserAvatar = async avatar => {
  try {
    const response = await authInstance.put('/avatar', avatar);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const needHelpApi = async data => {
  try {
    const response = await authInstance.post('/help', data);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
