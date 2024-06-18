import css from './CreateNewBoard.module.css';
import sprite from '../../../assets/sprite.svg';
import { Modal } from '@mui/material';
import { useRef, useState } from 'react';
import { BoardModal } from '../../BoardModal/BoardModal';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../../redux/auth/selectors';

const CreateNewBoard = () => {
  const selectedTheme = useSelector(selectTheme);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const ref = useRef();

  return (
    <div className={clsx(css.create, css[selectedTheme])}>
      <p className={clsx(css.buttonTitle, css[selectedTheme])}>
        Create a new board
      </p>
      <button
        className={clsx(css.button, css[selectedTheme])}
        type="button"
        onClick={() => setModalIsOpen(true)}
      >
        <div className={css.buttonPlus}>
          <svg
            className={clsx(css.iconPlus, css[selectedTheme])}
            width="20"
            height="20"
          >
            <use xlinkHref={`${sprite}#icon-plus`}></use>
          </svg>
        </div>
      </button>

      <Modal
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        disableAutoFocus={true}
      >
        <BoardModal ref={ref} closeModal={() => setModalIsOpen(false)} />
      </Modal>
    </div>
  );
};

export default CreateNewBoard;
