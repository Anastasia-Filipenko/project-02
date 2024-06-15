import { authInstance } from '../axiosConfig';

export const registerApi = async body => {
  try {
    const response = await authInstance.post('/register', body);
    localStorage.setItem('token', response.data.token);

    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const loginApi = async body => {
  try {
    const response = await authInstance.post('/login', body);
    localStorage.setItem('token', response.data.token);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const logOutApi = async () => {
  try {
    const response = await authInstance.post('/logout');
    localStorage.removeItem('token');
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const refreshApi = async () => {
  try {
    const response = await authInstance.get('/current');

    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getAllUserDataApi = async () => {
  try {
    const response = await authInstance.get('/data');
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateCurrentBoardId = async (boardId) => {
  try {
    const { data } = await authInstance.patch('/board', boardId);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};