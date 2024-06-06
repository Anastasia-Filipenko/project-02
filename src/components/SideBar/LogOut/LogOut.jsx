import css from './LogOut.module.css';
// import Icon from '../../Icon/Icon';
// і сюди dispatch
import sprite from '../../../assets/sprite.svg';

const LogOut = () => {
  //   додати dispatch
  return (
    <>
      {/* onClick додати */}
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
