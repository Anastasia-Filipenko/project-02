import css from '../Logo/Logo.module.css';
import sprite from '../../../assets/sprite.svg';

const Logo = () => {
  return (
    <>
      <div className={css.logo}>
        <div className={css.logoCont}>
          <svg className={css.logoIcon} width="20" height="20">
            <use xlinkHref={`${sprite}#icon-logo`}></use>
          </svg>
        </div>
        <p className={css.logoTitle}>Task Pro</p>
      </div>
    </>
  );
};

export default Logo;
