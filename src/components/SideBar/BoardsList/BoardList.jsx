import { useState, useRef } from 'react';
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
import { BoardModal } from '../../BoardModal/BoardModal';
import { setCurrentBoard } from '../../../redux/boards/slice';
import clsx from 'clsx';
import { selectTheme } from '../../../redux/auth/selectors';

const BoardList = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [boardId, setBoardId] = useState(false);
  const boards = useSelector(selectAllBoards);
  const currentBoard = useSelector(selectCurrentBoard);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef();
  const selectedTheme = useSelector(selectTheme);

  const handleOpenBoard = (boardId, boardTitle) => {
    dispatch(setCurrentBoard({ _id: boardId, title: boardTitle }));
    navigate(boardTitle);
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
    dispatch(deleteBoards(boardId)).then(() => {
      navigate('/home');
    });
  };

  return (
    <div className={css.cont}>
      <ul className={css.list}>
        {boards.map(board => {
          if (board._id === currentBoard?._id) {
            return (
              <div key={board._id} className={clsx(css.itemActive, css[selectedTheme])}>
                <div className={css.iconTitle}>
                  <svg width="18" height="18" className={clsx(css.iconActive, css[selectedTheme])}>
                    <use xlinkHref={`${sprite}#${board.icon}`}></use>
                  </svg>
                  <p className={clsx(css.titleActive, css[selectedTheme])}>{board.title}</p>
                </div>
                <div className={css.buttons}>
                  <button
                    type="button"
                    className={clsx(css.iconBtn, css[selectedTheme])}
                    onClick={() => handleEditBoard(board._id)}
                  >
                    <svg width="16" height="16">
                      <use xlinkHref={`${sprite}#icon-pen`}></use>
                    </svg>
                  </button>
                  <button
                    type="button"
                    className={clsx(css.iconBtn, css[selectedTheme])}
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
              <svg width="18" height="18" className={clsx(css.icon, css[selectedTheme])}>
                <use xlinkHref={`${sprite}#${board.icon}`}></use>
              </svg>
              <p className={clsx(css.title, css[selectedTheme])}>{board.title}</p>
            </div>
          );
        })}
      </ul>
      <Modal open={isModalOpen} onClose={closeModal} disableAutoFocus={true}>
        <BoardModal
          ref={ref}
          title={currentBoard.title}
          boardId={currentBoard._id}
          selectedIcon={currentBoard.icon}
          selectedBackground={currentBoard.background}
          closeModal={closeModal}
          editMode={true}
        />
      </Modal>
    </div>
  );
};

export default BoardList;
