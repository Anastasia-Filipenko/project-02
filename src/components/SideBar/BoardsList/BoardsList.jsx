// import css from './BoardsList.module.css';
import BoardListItem from './BoardListItem/BoardListItem';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllBoards } from '../../../redux/boards/selectors';
import { setCurrentBoard } from '../../../redux/boards/slice';
import { useState } from 'react';

const BoardsList = () => {
  const boards = useSelector(selectAllBoards);
  const dispatch = useDispatch();

  const handleBoardClick = board => {
    dispatch(setCurrentBoard(board));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {boards.length > 0 && (
        <ul>
          {boards.map(({ title, icon, _id: id }) => (
            <BoardListItem
              key={id}
              id={id}
              title={title}
              icon={icon}
              onBoardClick={() => handleBoardClick({ title, icon, id })} // Обертывание handleBoardClick в функцию
              onOpenModal={handleOpenModal}
              onCloseModal={handleCloseModal}
              isModalOpen={isModalOpen}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default BoardsList;
