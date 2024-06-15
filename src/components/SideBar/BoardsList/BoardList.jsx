import { useState } from 'react';
import { Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import sprite from '../../../assets/sprite.svg';
// update current board
import {
  selectAllBoards,
  selectCurrentBoard,
} from '../../../redux/boards/selectors';
import {
  fetchCurrentBoard,
  deleteBoards,
} from '../../../redux/boards/operations';
import css from './BoardList.module.css';
// import { deleteBoards } from '../../../redux/boards/operations';
// import { BoardModal } from '../../BoardModal/BoardModal';
import UpdateBoard from '../UpdateBoard/UpdateBoard';

const BoardList = () => {
  const [isModalOpen, setModalOpen] = useState(false);
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

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleEditBoard = boardId => {
    setBoardId(boardId);
    openModal();
  };

  const handleDeleteBoard = boardId => {
    dispatch(deleteBoards(boardId));
    navigate('/home');
  };

  return (
    <div className={css.cont}>
      <ul className={css.list}>
        {boards.map(board => {
          if (board._id === currentBoard?._id) {
            return (
              <div key={board._id} className={css.itemActive}>
                <div className={css.iconTitle}>
                  <svg width="18" height="18" className={css.iconActive}>
                    <use xlinkHref={`${sprite}#${board.icon}`}></use>
                  </svg>
                  <p className={css.titleActive}>{board.title}</p>
                </div>
                <div>
                  <button
                    type="button"
                    className={css.iconBtn}
                    onClick={() => handleEditBoard(board._id)}
                  >
                    <svg width="16" height="16">
                      <use xlinkHref={`${sprite}#icon-pen`}></use>
                    </svg>
                  </button>
                  <button
                    type="button"
                    className={css.iconBtn}
                    onClick={() => handleDeleteBoard(board._id)}
                  >
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
              className={css.item}
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
      <Modal
        open={openModal}
        onClose={closeModal}
        disableAutoFocus={true}
      >
        <UpdateBoard
          closeModal={() => setModalOpen(false)}
          UpdateBoard={true}
        />
      </Modal>
    </div>
  );
};

export default BoardList;
