import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, setTheme } from '../../redux/theme/themeSlice';
import css from './Header.module.css';
import { useState } from 'react';
import clsx from 'clsx';
// import UserInfo from '../UserInfo/UserInfo';
// import { selectUser } from '../../redux/user/userSlice';

const Header = () => {
  const selectedTheme = useSelector(selectTheme);
  // const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleSelectChange = event => {
    dispatch(setTheme(event.target.value));
    setIsDropdownOpen(false);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
            {/* <UserInfo user={user} /> */}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
