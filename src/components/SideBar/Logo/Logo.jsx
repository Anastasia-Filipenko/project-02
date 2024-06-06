import Icon from '../../Icon/Icon';
import css from '../Logo/Logo.module.css';

const Logo = () => {
  return (
    <>
      <div className={css.logo}>
        <Icon className={css.logoIcon} id="icon-login" width="32" height="32" />
        <p className={css.logoTitle}>Task Pro</p>
      </div>
    </>
  );
};

export default Logo;
