import { boardInstance, columnInstance } from '../axiosConfig';

export const currentBoardApi = async id => {
  try {
    const response = await boardInstance.get(`/${id}`);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
export const addBoardApi = async data => {
  try {
    const response = await boardInstance.post('/', data);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const addColumnApi = async data => {
  try {
    const response = await columnInstance.post('/', data);

    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const allBoardsApi = async () => {};
