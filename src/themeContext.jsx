import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
//import { ThemeProvider } from 'styled-components';

const themeContext = createContext();
const themeLight = {
  color: {
    backgroundLight: 'var(--color-light-primary)',
    backgroundVioletHeader: 'var(--color-violet-background-header)',
    backgroundVioletSidebar: 'var(--color-violet-background-sidebar)',
  },
};

const themeViolet = {
  color: {
    backgroundVioletHeader: 'var(--color-violet-background-header)',
    backgroundVioletSidebar: 'var(--color-violet-background-sidebar)',
  },
};

const themeDark = {
  color: {
    backgroundBlack: 'var(--color-dark-primary)',
  },
};

export const getTheme = theme => {
  switch (theme) {
    case 'dark':
      return themeDark;
    case 'violet':
      return themeViolet;
    case 'light':
    default:
      return themeLight;
  }
};

export const ThemeChangeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = newTheme => {
    setTheme(newTheme);
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <themeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </themeContext.Provider>
  );
};

// ThemeChangeProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };
export const useTheme = () => useContext(themeContext);
export default themeContext;
