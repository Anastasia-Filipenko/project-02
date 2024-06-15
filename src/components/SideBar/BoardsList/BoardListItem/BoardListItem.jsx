// import { useDispatch } from 'react-redux';
import sprite from '../../../../assets/sprite.svg';
import { BoardModal } from '../../../BoardModal/BoardModal';
// import { deleteBoard } from 'redux/board/operation';
import css from './BoardListItem.module.css';

const BoardListItem = ({
  id,
  title,
  icon,
  onBoardClick,
  onOpenModal,
  onCloseModal,
  isModalOpen,
}) => {
  // const dispatch = useDispatch();

  const board = { id, title };

  const handleDeleteBoard = () => {
    // dispatch(deleteBoard(id));
    console.log(`Delete board with id: ${id}`);
    // тимчасово
  };

  return (
    <div className={css.cont}>
      <div className={css.iconTitle}>
        <button onClick={() => onBoardClick(board)} className={css.icon}>
          <svg width="18" height="18">
            <use xlinkHref={`${sprite}#${icon}`}></use>
          </svg>
        </button>
        <p className={css.title}>{title}</p>
      </div>
      <div>
        <button type="button" onClick={onOpenModal} className={css.pen}>
          <svg width="16" height="16">
            <use xlinkHref={`${sprite}#icon-pen`}></use>
          </svg>
        </button>
        {/* видалення дошки */}
        <button
          type="button"
          onClick={handleDeleteBoard}
          className={css.delete}
        >
          <svg width="16" height="16">
            <use xlinkHref={`${sprite}#icon-trash`}></use>
          </svg>
        </button>
      </div>
      {isModalOpen && (
        <BoardModal
          isOpen={isModalOpen}
          onClose={onCloseModal}
          title="Edit board"
        >
          {/* апдейт */}
        </BoardModal>
      )}
    </div>
  );
};

export default BoardListItem;