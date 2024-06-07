import { NavLink } from 'react-router-dom';
import css from './NotFoundPage.module.css';
import sprite from '../../assets/sprite.svg';

export default function NotFound() {
  return (
    <div className={css.container}>
      <h1>We are sorry,</h1>
      <h2 className={css.title}>
        but the page you were looking for can`t be found.
      </h2>
      <NavLink to="/welcome" className={css.link}>
        Back to home
      </NavLink>
      <svg className={css.logo_icon} width="18" height="24">
        <use xlinkHref={`${sprite}#icon-trash`}></use>
      </svg>
    </div>
  );
}
