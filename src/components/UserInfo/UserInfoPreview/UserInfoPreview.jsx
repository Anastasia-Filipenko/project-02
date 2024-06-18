import Modal from 'react-modal';
import css from './UserInfoPreview.module.css';
import UserInfoModal from '../UserInfoModal/UserInfoModal';
import styles from '../UserInfoModal/UserInfoModal.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import {
  selectUserName,
  selectUserAvatar,
} from '../../../redux/auth/selectors';
import { selectTheme } from '../../../redux/auth/selectors';
import userAvatarPath from './userAvatarPath';
import { setAvatar } from '../../../redux/auth/authSlice';

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

const getDefaultAvatarForTheme = theme => {
  switch (theme) {
    case 'dark':
      return userAvatarPath.userAvatarDark;
    case 'light':
      return userAvatarPath.userAvatarLight;
    case 'violet':
      return userAvatarPath.userAvatarViolet;
    default:
      return userAvatarPath.userAvatarDark;
  }
};

const UserInfoPreview = () => {
  const userName = useSelector(selectUserName);
  const userAvatar = useSelector(selectUserAvatar);
  const selectedTheme = useSelector(selectTheme);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userAvatarDefault, setUserAvatarDefault] = useState(
    userAvatarPath.userAvatarDark
  );

  const dispatch = useDispatch();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const userTheme = getDefaultAvatarForTheme(selectedTheme);
    if (userAvatar === userAvatarPath.userAvatarDark) {
      // console.log(1111);
      dispatch(setAvatar(userTheme));
      return setUserAvatarDefault(userTheme);
    } else {
      // console.log(22222);
      dispatch(setAvatar(userAvatar));
      return setUserAvatarDefault(userAvatar);
    }
  }, [userAvatar, selectedTheme]);

  return (
    <>
      <div className={clsx(css.user, css[selectedTheme])} onClick={openModal}>
        <p className={clsx(css.user_name, css[selectedTheme])}>{userName}</p>
        <img
          className={css.user_avatar}
          src={userAvatarDefault}
          alt="User Avatar"
        />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        className={styles.ReactModal__Content}
        contentLabel="Example Modal"
      >
        <UserInfoModal close={closeModal} />
      </Modal>
    </>
  );
};

export default UserInfoPreview;

// imgAvatar = { userAvatarDefault };
