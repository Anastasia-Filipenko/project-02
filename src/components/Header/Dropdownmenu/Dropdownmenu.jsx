import { useState } from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from '../../../redux/theme/selectors';
import css from './Dropdownmenu.module.css';
import { changeTheme } from '../../../redux/theme/operations';
import { selectUserId } from '../../../redux/auth/selectors';

const DropdownMenu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const selectedTheme = useSelector(selectTheme);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectChange = theme => {
    dispatch(changeTheme({ _id: userId, theme }));
    setIsDropdownOpen(false);
  };
  return (
    <div className={clsx(css.dropdown, css[selectedTheme])}>
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
            className={clsx(css.dropdownContentButton, css.light)}
            onClick={() => handleSelectChange('light')}
          >
            Light
          </button>
          <button
            className={clsx(css.dropdownContentButton, css.dark)}
            onClick={() => handleSelectChange('dark')}
          >
            Dark
          </button>
          <button
            className={clsx(css.dropdownContentButton, css.violet)}
            onClick={() => handleSelectChange('violet')}
          >
            Violet
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
