import css from './NeedHelp.module.css';
import Modal from 'react-modal';
import NeedHelpModal from '../../NeedHelp/NeedHelpModal';
import styles from '../../NeedHelp/NeedHelpModal.module.css';
import { useState } from 'react';
import sprite from '../../../assets/sprite.svg';

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

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className={css.container}>
      <svg className={css.logoIcon}></svg>
      <p className={css.infoText}>
        If you need help width <br />
        <a className={css.perfectTask}>Task Pro</a>
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
      <button type="button" className={css.helpCont} onClick={openModal}>
        <svg className={css.help} width="15" height="15">
          <use xlinkHref={`${sprite}#icon-help-circle`}></use>
        </svg>
        <p className={css.helpText}>Need help?</p>
      </button>
    </div>
  );
};

export default NeedHelp;
