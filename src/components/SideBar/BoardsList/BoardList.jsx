import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import sprite from '../../../assets/sprite.svg';
// update current board
import {
  selectAllBoards,
  selectCurrentBoard,
} from '../../../redux/boards/selectors';
import { fetchCurrentBoard } from '../../../redux/boards/operations';
import css from './BoardList.module.css';

const BoardList = () => {
//   const [isModalOpen, setModalOpen] = useState(false);
  const [boardId, setBoardId] = useState(false);
  const boards = useSelector(selectAllBoards);
  const currentBoard = useSelector(selectCurrentBoard);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenBoard = async (boardId, boardTitle) => {
    await dispatch(fetchCurrentBoard(boardId));
    // update
    const normTitle = boardTitle.toLowerCase().replace(/[\s/]+/g, '-');
    console.log('Navigating to:', normTitle);
    navigate(normTitle);
  };

//   const openModal = () => {
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//   };

  // edit and delete

  return (
    <div>
      <ul>
        {boards.map(board => {
          if (board._id === currentBoard?._id) {
            return (
              <div key={board._id}>
                <svg width="18" height="18" className={css.icon}>
                  <use xlinkHref={`${sprite}#${board.icon}`}></use>
                </svg>
                <p className={css.title}>{board.title}</p>
                <div>
                  {/* edit */}
                  <button type="button" className={css.icon}>
                    <svg width="16" height="16">
                      <use xlinkHref={`${sprite}#icon-pen`}></use>
                    </svg>
                  </button>
                  {/* delete */}
                  <button type="button" className={css.icon}>
                    <svg width="18" height="18">
                      <use xlinkHref={`${sprite}#icon-trash`}></use>
                    </svg>
                  </button>
                </div>
              </div>
            );
          }

          return (
            <div
              key={board._id}
              onClick={() => {
                handleOpenBoard(board._id, board.title);
              }}
            >
              <svg width="18" height="18" className={css.icon}>
                <use xlinkHref={`${sprite}#${board.icon}`}></use>
              </svg>
              <p className={css.title}>{board.title}</p>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default BoardList;
