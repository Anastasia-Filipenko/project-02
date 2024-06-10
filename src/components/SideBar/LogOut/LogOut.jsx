import css from './LogOut.module.css';
import { useDispatch } from 'react-redux';
import sprite from '../../../assets/sprite.svg';
import {logOut} from '../../../redux/auth/operations';

const LogOut = () => {
  const dispatch = useDispatch();
  const onLogOut = () => dispatch(logOut());
  return (
    <>
      <button className={css.buttonLogOut} onClick={onLogOut} type="button">
        <div className={css.iconLogOut}>
          <svg className={css.logOut} width="32" height="32">
            <use xlinkHref={`${sprite}#icon-login`}></use>
          </svg>
        </div>
        Log Out
      </button>
    </>
  );
};

export default LogOut;