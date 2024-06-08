import css from './LogOut.module.css';
// import { useDispatch } from 'react-redux';
import sprite from '../../../assets/sprite.svg';
// logout додати з auth-oper

const LogOut = () => {
  // const dispatch = useDispatch();
  // const onLogOut = () => dispatch(logout());
  // цей момент не точний
  return (
    <>
    {/*  onClick={onLogOut} */}
      <button className={css.buttonLogOut} type="button">
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