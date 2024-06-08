const boardsStorage = [
    {
      id: 1,
      title: 'TestBoard1',
      columns: [{ name: 'first' }, { name: 'second' }, { name: 'third column' }],
    },
  {
    id: 2,
    title: 'TestBoard2',
  },
];

export const addTestBoard = boardData => {
  boardsStorage.push(boardData);
};

export const allBoards = () => {
  return {
    data: boardsStorage.map(board => {
      return {
        id: board.id,
        title: board.title,
      };
    }),
  };
};

export const getOneBoard = title => {
  const cB = boardsStorage.filter(b => b.title === title)[0];
  return { data: { ...cB } };
};
