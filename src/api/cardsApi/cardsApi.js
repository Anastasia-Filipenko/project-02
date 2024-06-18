import { cardsInstance } from '../axiosConfig';

export const createCardApi = async data => {
  try {
    // console.log(data);
    const response = await cardsInstance.post('/', data);
    // console.log(response);

    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const editCardByIdApi = async (id, body) => {
  try {
    const response = await cardsInstance.put(`/${id}`, body);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteCardApi = async id => {
  try {
    const response = await cardsInstance.delete(`${id}`);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const moveCardApi = async (cardId, newColumnId) => {
  try {
    const columnId = {
      columnId: newColumnId,
    };
    const response = await cardsInstance.patch(`/${cardId}/move`, columnId);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
