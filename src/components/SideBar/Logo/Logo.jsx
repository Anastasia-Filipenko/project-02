import css from '../Logo/Logo.module.css';
import sprite from '../../../assets/sprite.svg';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { selectTheme } from '../../../redux/theme/selectors';

const Logo = () => {
  const selectedTheme = useSelector(selectTheme);

  return (
    <>
      <div className={css.logo}>
        <div className={clsx(css.logoCont, css[selectedTheme])}>
          <svg
            className={clsx(css.logoIcon, css[selectedTheme])}
            width="20"
            height="20"
          >
            <use xlinkHref={`${sprite}#icon-logo`}></use>
          </svg>
        </div>
        <p className={clsx(css.logoTitle, css[selectedTheme])}>Task Pro</p>
      </div>
    </>
  );
};

export default Logo;
