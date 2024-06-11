import Modal from 'react-modal';
import userAvatar from '../../../../images/userAvatar.jpg';
import css from '../UserInfoPreview/UserInfoPreview.module.css';

const UserInfoPreview = () => {
  return (
    <>
      <div className={css.user}>
        <p>Username</p>
        <img src={userAvatar} alt="" />
      </div>
    </>
  );
};

export default UserInfoPreview;
