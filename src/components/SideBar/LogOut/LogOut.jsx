import css from './LogOut.module.css';
import { useDispatch, useSelector } from 'react-redux';
import sprite from '../../../assets/sprite.svg';
import { logOut } from '../../../redux/auth/operations';
import clsx from 'clsx';
import { selectTheme } from '../../../redux/theme/selectors';

const LogOut = () => {
  const selectedTheme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const onLogOut = () => dispatch(logOut());
  return (
    <>
      <button
        className={clsx(css.buttonLogOut, css[selectedTheme])}
        onClick={onLogOut}
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
    </>
  );
};

export default LogOut;
