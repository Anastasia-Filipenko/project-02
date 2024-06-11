import { useDispatch } from 'react-redux';
import sprite from '../../../../assets/sprite.svg';
import { BoardModal } from '../../../BoardModal/BoardModal';
// import deleteBoard з redux/board/operation

const BoardListItem = ({
  id,
  title,
  icon,
  handleBoardClick,
  handleOpenModal,
  handleCloseModal,
  isModalOpen,
}) => {
  const dispatch = useDispatch();

  const board = { id, title };

  return (
    <div>
      <button onClick={() => handleBoardClick(board)}>
        <svg width="18" height="18">
          <use xlinkHref={`${sprite}`} id={icon}></use>
        </svg>
      </button>
      <div>
        <button type="button" onClick={handleOpenModal}>
          <svg width="16" height="16">
            <use xlinkHref={`${sprite}#icon-pen`}></use>
          </svg>
        </button>
        {/* delete board */}
        {/* <button type="button" onClick={() => dispatch()}></button> */}
      </div>
      {isModalOpen && (
        <BoardModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Edit board"
        >
          {/*updateBoard  */}
        </BoardModal>
      )}
    </div>
  );
};

export default BoardListItem;
