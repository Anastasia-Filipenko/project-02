import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, setTheme } from '../../redux/theme/themeSlice';
import css from './Header.module.css';
//import { useState } from 'react';
import clsx from 'clsx';
import UserInfoModal from '../UserInfo/UserInfoModal/UserInfoModal';
import UserInfoPreview from '../UserInfo/UserInfoPreview/UserInfoPreview';
// import { selectUser } from '../../redux/user/userSlice';
import BurgerMenuIcon from './BurgerMenuIcon/BurgerMenuIcon';
import DropdownMenu from './Dropdownmenu/Dropdownmenu';

const Header = ({ toggleSidebar, closeSidebar }) => {
  const selectedTheme = useSelector(selectTheme);
  //const dispatch = useDispatch();
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const handleSelectChange = event => {
  //   dispatch(setTheme(event.target.value));
  //   setIsDropdownOpen(false);
  // };
  // const toggleDropdown = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  // };

  const handleBurgerMenuClick = event => {
    event.stopPropagation(); 
    toggleSidebar();
  };

  const handleHeaderClick = () => {
    closeSidebar();
  };

  return (
    <>
      <header>
        <div className={clsx(css.header, css[selectedTheme])}>
          <div className={clsx(css.dropdown, css[selectedTheme])}>
            <button
              className={clsx(css.dropbtn, css[selectTheme])}
              onClick={toggleDropdown}
            >
              Theme
              <span className={clsx(css.arrow, css[selectTheme])}>&#9660;</span>
            </button>
            {isDropdownOpen && (
              <div className={clsx(css.dropdownContent, css[selectTheme])}>
                <button value="light" onClick={handleSelectChange}>
                  Light
                </button>
                <button value="dark" onClick={handleSelectChange}>
                  Dark
                </button>
                <button value="violet" onClick={handleSelectChange}>
                  Violet
                </button>
              </div>
            )}
          </div>
          <UserInfoPreview />
          {/* <UserInfoModal /> */}
          {/* OpenUserInfoModal */}
        </div>
    <div className={css.container}>
    <header
      className={clsx(css.header, css[selectedTheme])}
      onClick={handleHeaderClick}
    >
      {/* <div className={clsx(css.dropdown, css[selectedTheme])}>
        <button
          className={clsx(css.dropbtn, css[selectedTheme])}
          onClick={toggleDropdown}
        >
          Theme
          <span className={clsx(css.arrow, css[selectedTheme])}>&#9660;</span>
        </button>
        {isDropdownOpen && (
          <div className={clsx(css.dropdownContent, css[selectedTheme])}>
            <button
              className={clsx(css.dropdownContentButton, css[selectedTheme])}
              value="light"
              onClick={handleSelectChange}
            >
              Light
            </button>
            <button
              className={clsx(css.dropdownContentButton, css[selectedTheme])}
              value="dark"
              onClick={handleSelectChange}
            >
              Dark
            </button>
            <button
              className={clsx(css.dropdownContentButton, css[selectedTheme])}
              value="violet"
              onClick={handleSelectChange}
            >
              Violet
            </button>
          </div>
        )}
      </div> */}
        <DropdownMenu/>
      <div
               className={clsx(css.burgerMenu, css[selectedTheme])}
        onClick={handleBurgerMenuClick}
      >
       <BurgerMenuIcon/>
      </div>
      </header>
      </div>
  );
};

export default Header;
