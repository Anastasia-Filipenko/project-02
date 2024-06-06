import css from './WelcomePage.module.css';
import user_desktop_2x from '../../images/user_desktop_2x.png';
import { NavLink } from 'react-router-dom';

export default function Welcome() {
  return (
    <>
      <div className={css.container}>
        <div className={css.wrapper}>
          <img src={user_desktop_2x} alt="user" className={css.image} />
          <div className={css.wrapper_logo}>
            <div className={css.wrapper_logo_name}>
              <div className={css.logo}>
                <svg className={css.logo_icon} width="18" height="24">
                  <use xlinkHref="/src/assets/sprite.svg#icon-logo"></use>
                </svg>
              </div>
              <h1 className={css.name}>Task Pro</h1>
            </div>
          </div>
          <p className={css.welcome_text}>
            Supercharge your productivity and take control of your tasks with
            Task Pro - Don't wait, start achieving your goals now!
          </p>

          {/* authPage */}
          <div className={css.btn}>
            <NavLink to="/auth/register" className={css.btn_register}>
              Registration
            </NavLink>
            <NavLink to="/auth/login" className={css.btn_login}>
              Log In
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
