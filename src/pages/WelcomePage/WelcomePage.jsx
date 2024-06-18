import css from './WelcomePage.module.css';
import { NavLink } from 'react-router-dom';
import sprite from '../../assets/sprite.svg';
import { useState, useEffect } from 'react';
import UserPath from '../../images/UserWelcome';

const ResponsiveImage = () => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const pixelRatio = window.devicePixelRatio;
      let selectedImage = '';

      if (width >= 1200) {
        selectedImage =
          pixelRatio > 1 ? UserPath.userDesktop2x : UserPath.userDesktop;
      } else if (width >= 768) {
        selectedImage =
          pixelRatio > 1 ? UserPath.userTablet2x : UserPath.userTablet2x;
      } else {
        selectedImage =
          pixelRatio > 1 ? UserPath.userMobile2x : UserPath.userMobile;
      }

      setImageSrc(selectedImage);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <img src={imageSrc} alt="User" className={css.image} />
    </>
  );
};

export default function Welcome() {
  return (
    <>
      <div className={css.container}>
        <div className={css.wrapper}>
          <ResponsiveImage />
          <div className={css.wrapper_logo}>
            <div className={css.wrapper_logo_name}>
              <div className={css.logo}>
                <svg className={css.logo_icon} width="18" height="24">
                  <use xlinkHref={`${sprite}#icon-logo`}></use>
                </svg>
              </div>
              <h1 className={css.name}>Task Pro</h1>
            </div>
          </div>
          <div className={css.wrapper_text}>
            <p className={css.welcome_text}>
              Supercharge your productivity and take control of your tasks with
              Task Pro - Don't wait, start achieving your goals now!
            </p>
          </div>

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
