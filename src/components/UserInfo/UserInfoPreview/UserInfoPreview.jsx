import Modal from 'react-modal';
import css from './UserInfoPreview.module.css';
import UserInfoModal from '../UserInfoModal/UserInfoModal';
import styles from '../UserInfoModal/UserInfoModal.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  selectUserName,
  selectUserAvatar,
} from '../../../redux/auth/selectors';
import clsx from 'clsx';
import { selectTheme } from '../../../redux/theme/selectors';
import userAvatarPath from './userAvatarPath';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '400px',
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
  const userAvatarDark = userAvatarPath.userAvatarDark;
  const userAvatarViolet = userAvatarPath.userAvatarViolet;
  const userAvatarLight = userAvatarPath.userAvatarLight;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const userName = useSelector(selectUserName);
  const userAvatar = useSelector(selectUserAvatar);
  const selectedTheme = useSelector(selectTheme);
  const [userAvatarDefault, setUserAvatarDefault] = useState(userAvatarDark);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const getDefaultAvatarForTheme = theme => {
    let defaultAvatar;
    switch (theme) {
      case 'dark':
        defaultAvatar = userAvatarDark;
        break;
      case 'light':
        defaultAvatar = userAvatarLight;
        break;
      case 'violet':
        defaultAvatar = userAvatarViolet;
        break;
      default:
        defaultAvatar = userAvatarDark;
    }
    return defaultAvatar;
  };

  useEffect(() => {
    const userTheme = getDefaultAvatarForTheme(selectedTheme);
    setUserAvatarDefault(userTheme);

    if (userAvatar) {
      setUserAvatarDefault(userAvatar);
    }
  }, [userAvatar, selectedTheme, getDefaultAvatarForTheme]);

  return (
    <>
      <div className={clsx(css.user, css[selectedTheme])} onClick={openModal}>
        <p className={clsx(css.user_name, css[selectedTheme])}>{userName}</p>
        <img className={css.user_avatar} src={userAvatarDefault} alt="" />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        className={styles.ReactModal__Content}
        contentLabel="Example Modal"
      >
        {<UserInfoModal close={closeModal} imgAvatar={userAvatarDefault} />}
      </Modal>
    </>
  );
};

export default UserInfoPreview;
