import { columnInstance } from '../axiosConfig';

export const addColumnApi = async data => {
  try {
    const response = await columnInstance.post('/', data);

    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const editColumnApi = async (id, data) => {
  try {
    const response = await columnInstance.put(`/${id}`, data);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getColumnApi = async id => {
  try {
    const response = await columnInstance.get(`/${id}`);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
export const deleteColumnApi = async id => {
  try {
    const response = await columnInstance.delete(`/${id}`);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
