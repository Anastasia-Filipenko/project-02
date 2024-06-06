import css from './LogOut.module.css';
import Icon from '../../Icon/Icon';
// і сюди dispatch

const LogOut = () => {
//   додати dispatch
    return (
    <>
      {/* onClick додати */}
      <button className={css.buttonLogOut} type="button">
        <Icon id="" width="32" height="32" />
        Log Out
      </button>
    </>
  );
};

export default LogOut;
