import { columnInstance } from '../axiosConfig';

export const addColumnApi = async data => {
  try {
    const response = await columnInstance.post('/', data);

    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const editColumnApi = async data => {
  try {
    const response = await columnInstance.put(`/${data.columnId}`, {
      boardId: data.boardId,
      title: data.title,
    });
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteColumnApi = async data => {
  try {
    const response = await columnInstance.delete(`/${data.columnId}`);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const allBoardsApi = async () => {};
