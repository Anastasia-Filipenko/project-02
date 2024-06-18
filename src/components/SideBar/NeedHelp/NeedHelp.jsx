import css from './NeedHelp.module.css';
import Modal from 'react-modal';
import NeedHelpModal from '../../NeedHelp/NeedHelpModal';
import styles from '../../NeedHelp/NeedHelpModal.module.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import sprite from '../../../assets/sprite.svg';
import clsx from 'clsx';
import { selectTheme } from '../../../redux/theme/selectors';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    // height: '420px',
    borderRadius: '15px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
};

Modal.setAppElement('#modal');

const NeedHelp = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const selectedTheme = useSelector(selectTheme);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className={clsx(css.container, css[selectedTheme])}>
      <svg className={clsx(css.logoIcon, css[selectedTheme])}></svg>
      <p className={clsx(css.infoText, css[selectedTheme])}>
        If you need help with <br />
        <a className={clsx(css.perfectTask, css[selectedTheme])}>Task Pro</a>
        , check out our support resources or <br />
        reach out to our <br />
        customer support team.
      </p>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        className={styles.ReactModal__Content}
        contentLabel="Example Modal"
      >
        {<NeedHelpModal close={closeModal} />}
      </Modal>
      <button
        type="button"
        className={clsx(css.helpCont, css[selectedTheme])}
        onClick={openModal}
      >
        <svg
          className={clsx(css.help, css[selectedTheme])}
          width="15"
          height="15"
        >
          <use xlinkHref={`${sprite}#icon-help-circle`}></use>
        </svg>
        <p className={clsx(css.helpText, css[selectedTheme])}>Need help?</p>
      </button>
    </div>
  );
};

export default NeedHelp;
