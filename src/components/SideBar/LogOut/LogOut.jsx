import css from './LogOut.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import sprite from '../../../assets/sprite.svg';
import clsx from 'clsx';
import { selectTheme } from '../../../redux/auth/selectors';
import Modal from 'react-modal';
import ModalLogOut from './ModalLogOut';
import { logOut } from '../../../redux/auth/operations';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    minWidth: '320px',
    maxWidth: '600px',
    borderRadius: '15px',
    background: 'rgb(204, 204, 204)',
    overflow: 'auto',
    outline: 'none',
    padding: '10px',
    boxShadow: '0px -1px 7px 0px silver',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '100',
  },
};

Modal.setAppElement('#modal');

const LogOut = () => {
  const selectedTheme = useSelector(selectTheme);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();
  const onLogOut = () => dispatch(logOut());

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <button
        className={clsx(css.buttonLogOut, css[selectedTheme])}
        onClick={openModal}
        type="button"
      >
        <div className={clsx(css.iconLogOut, css[selectedTheme])}>
          <svg
            className={clsx(css.logOut, css[selectedTheme])}
            width="32"
            height="32"
          >
            <use xlinkHref={`${sprite}#icon-login`}></use>
          </svg>
        </div>
        Log Out
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ModalLogOut close={closeModal} logout={onLogOut} />
      </Modal>
    </>
  );
};

export default LogOut;
