import css from './NeedHelp.module.css';
import Modal from 'react-modal';
import NeedHelpModal from '../../NeedHelp/NeedHelpModal';
import styles from '../../NeedHelp/NeedHelpModal.module.css';
import { useState } from 'react';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    heigth: '400px',
    borderRadius: '15px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
      {/* <svg></svg> */}
      <p className={css.infoText}>
        If you need help width <br />
        <a className={css.perfectTask} onClick={openModal}>
          Task Pro
        </a>
        , check out our support resources or reach out to our customer support
        team.
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
      {/* відкриття модального вікна link + icon*/}
      {/* закриття модального вікна */}
    </div>
  );
};

export default NeedHelp;
