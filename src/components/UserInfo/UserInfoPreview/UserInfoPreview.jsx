import Modal from 'react-modal';
// import userAvatar from '../../../images/userAvatar.jpg';
import css from './UserInfoPreview.module.css';
import UserInfoModal from '../UserInfoModal/UserInfoModal';
import styles from '../UserInfoModal/UserInfoModal.module.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectUserName,
  selectUserAvatar,
} from '../../../redux/auth/selectors';
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
  },
};

Modal.setAppElement('#modal');

const UserInfoPreview = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const userName = useSelector(selectUserName);
  const userAvatar = useSelector(selectUserAvatar);
  const selectedTheme = useSelector(selectTheme);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div className={clsx(css.user, css[selectedTheme])} onClick={openModal}>
        <p className={clsx(css.user_name, css[selectedTheme])}>{userName}</p>
        <img className={css.user_avatar} src={userAvatar} alt="" />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        className={styles.ReactModal__Content}
        contentLabel="Example Modal"
      >
        {<UserInfoModal close={closeModal} />}
      </Modal>
    </>
  );
};

export default UserInfoPreview;
