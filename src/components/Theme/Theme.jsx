import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { selectTheme, setTheme } from '../../redux/theme/themeSlice';
import { getTheme, useTheme } from '../../themeContext';

const Theme = ({ children }) => {
  const selectedTheme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    toggleTheme(selectedTheme);
  }, [selectedTheme, toggleTheme]);

  const handleThemeChange = newTheme => {
    dispatch(setTheme(newTheme));
  };

  return (
    <ThemeProvider theme={getTheme(theme)}>
      {typeof children === 'function' ? children(handleThemeChange) : children}
    </ThemeProvider>
  );
};

Theme.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
};

export default Theme;

