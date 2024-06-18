import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/auth/selectors';
import css from './Header.module.css';
//import { useState } from 'react';
import clsx from 'clsx';
//import UserInfoModal from '../UserInfo/UserInfoModal/UserInfoModal';
import UserInfoPreview from '../UserInfo/UserInfoPreview/UserInfoPreview';
// import { selectUser } from '../../redux/user/userSlice';
import BurgerMenuIcon from './BurgerMenuIcon/BurgerMenuIcon';
import DropdownMenu from './Dropdownmenu/Dropdownmenu';

const Header = ({ toggleSidebar, closeSidebar }) => {
  const selectedTheme = useSelector(selectTheme);
  const handleBurgerMenuClick = event => {
    event.stopPropagation();
    toggleSidebar();
  };

  const handleHeaderClick = () => {
    closeSidebar();
  };

  return (
    <div className={css.container}>
      <header
        className={clsx(css.header, css[selectedTheme])}
        onClick={handleHeaderClick}
      >
        <div
          className={clsx(css.burgerMenu, css[selectedTheme])}
          onClick={handleBurgerMenuClick}
        >
          <BurgerMenuIcon />
        </div>

        <div className={clsx(css.themeSection, css[selectedTheme])}>
          <DropdownMenu />
        </div>

        <div className={clsx(css.userSection, css[selectedTheme])}>
          <UserInfoPreview className={clsx(css.userInfo, css[selectedTheme])} />
        </div>

        {/* <UserInfoModal /> */}
        {/* OpenUserInfoModal */}
      </header>
    </div>
  );
};

export default Header;
