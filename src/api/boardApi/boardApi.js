import { boardInstance } from '../axiosConfig';

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

export const editBoardApi = async (id, data) => {
  try {
    const response = await boardInstance.put(`/${id}`, data);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteBoardApi = async id => {
  const response = await boardInstance.delete(`/${id}`);
  return response;
};
