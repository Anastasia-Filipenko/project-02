import css from './CreateNewBoard.module.css';
import sprite from '../../../assets/sprite.svg';
import { Modal } from '@mui/material';
import { useRef, useState } from 'react';
import { BoardModal } from '../../BoardModal/BoardModal';

const CreateNewBoard = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const ref = useRef();

  return (
    <div className={css.create}>
      <p className={css.buttonTitle}>Create a new board</p>
      <button
        className={css.button}
        type="button"
        onClick={() => setModalIsOpen(true)}
      >
        <div className={css.buttonPlus}>
          <svg className={css.iconPlus} width="20" height="20">
            <use xlinkHref={`${sprite}#icon-plus`}></use>
          </svg>
        </div>
      </button>

      <Modal
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        disableAutoFocus={true}
      >
        <BoardModal
          ref={ref}
          selectedIcon={selectedIcon}
          setSelectedIcon={val => setSelectedIcon(val)}
          closeModal={() => setModalIsOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default CreateNewBoard;
