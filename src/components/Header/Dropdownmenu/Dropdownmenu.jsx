import { useState } from 'react';
import { Menu, MenuItem, Button } from '@mui/material';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme} from '../../../redux/theme/selectors';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import css from './Dropdownmenu.module.css';
import { changeTheme } from '../../../redux/theme/operations';
import { selectUserId } from '../../../redux/auth/selectors';

const DropdownMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const selectedTheme = useSelector(selectTheme);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = theme => {
    dispatch(changeTheme({ _id: userId, theme }));
    setAnchorEl(null);
  };

  const themeStyles = {
    light: {
      color: '#000000',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      },
    },
    dark: {
      color: '#ffffff',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      },
    },
    violet: {
      color: '#ffffff',
      '&:hover': {
        backgroundColor: 'rgba(128, 0, 128, 0.1)',
      },
    },
  };

  return (
    <div className={clsx(css.dropdown, css[selectedTheme])}>
      <Button
        className={clsx(css.dropbtn, css[selectedTheme])}
        sx={{
          textTransform: 'none',
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...themeStyles[selectedTheme],
          fontSize: '14px',
        }}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="text"
      >
        Theme
        <ArrowDropDownIcon />
      </Button>
      <Menu
        sx={{ fontSize: '14px' }}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => handleClose(null)}
      >
        <MenuItem
          sx={{ fontSize: '14px' }}
          className={clsx(css.dropdownContentButton, css[selectedTheme])}
          onClick={() => handleClose('dark')}
        >
          Dark
        </MenuItem>
        <MenuItem
          sx={{ fontSize: '14px' }}
          className={clsx(css.dropdownContentButton, css[selectedTheme])}
          onClick={() => handleClose('light')}
        >
          Light
        </MenuItem>
        <MenuItem
          sx={{ fontSize: '14px' }}
          className={clsx(css.dropdownContentButton, css[selectedTheme])}
          onClick={() => handleClose('violet')}
        >
          Violet
        </MenuItem>
      </Menu>
    </div>
  );
};

export default DropdownMenu;
