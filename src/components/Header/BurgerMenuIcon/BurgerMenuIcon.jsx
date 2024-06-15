import clsx from 'clsx';
import sprite from '../../../assets/sprite.svg';
import css from './BurgerMenu.module.css';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../../redux/theme/selectors';

const BurgerMenuIcon = () => {
  const selectedTheme = useSelector(selectTheme);
  return (
    <>
      <div className={clsx(css.burgerMenuComponent, css[selectedTheme])}>
        <div className={clsx(css.burgerMenuButton, css[selectedTheme])}>
          <svg
            className={clsx(css.burgerIcon, css[selectedTheme])}
            width="32"
            height="32"
          >
            <use xlinkHref={`${sprite}#icon-menu`}></use>
          </svg>
        </div>
      </div>
    </>
  );
};
export default BurgerMenuIcon;
