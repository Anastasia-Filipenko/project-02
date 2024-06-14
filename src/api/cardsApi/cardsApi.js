import { cardsInstance } from '../axiosConfig';

export const createCardApi = async data => {
  try {
    console.log(data);
    const response = await cardsInstance.post('/', data);
    console.log(response);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const editCardByIdApi = async id => {
  try {
    const response = await cardsInstance.put(`/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteCardApi = async id => {
  try {
    const response = await cardsInstance.delete(`${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const moveCardApi = async id => {
  try {
    const response = await cardsInstance.patch(`/${id}/move`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
