import { authInstance } from './axiosConfig';

export const changeUserProfileApi = async (id, data) => {
  try {
    const response = await authInstance.put(`/${id}`, data);
    console.log(response.data);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
