import { NavLink } from 'react-router-dom';
import css from './NotFoundPage.module.css';

export default function NotFound() {
  return (
    <div className={css.container}>
      <h1>We are sorry,</h1>
      <div className={css.containerImg}>
        <p className={css.error}>Error</p>
        <img
          className={css.img}
          src="https://res.cloudinary.com/dyqmk6bfl/image/upload/v1717835786/photo_2024-06-12_12-42-57-Photoroom_iip0to.png"
          alt="cat"
        />
        <p className={css.errorCode}>404</p>
      </div>
      <h2 className={css.title}>
        but the page you were looking for can`t be found.
      </h2>
      <NavLink to="/welcome" className={css.link}>
        Back to home
      </NavLink>
    </div>
  );
}
