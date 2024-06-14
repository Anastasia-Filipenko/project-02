import { createContext, useState, useEffect, useContext } from 'react';

const themeContext = createContext();
const themeDark = {
  color: {
    backgroundBlackHeader: 'var( --background-header-dark)',
    backgroundBlackSidebar: 'var( --background-sidebar-dark)',
    backgroundBlackBody: 'var(--background-body)',
    colorTextBlack: 'var( --text-color-dark)',
  },
};
const themeLight = {
  color: {
    backgroundLight: 'var(--color-light-primary)',
    themeColor: 'var(--color-light-primary)',
    defaultBoardBackground: 'var(--color-light-primary)',
    backgroundVioletHeader: 'var(--color-violet-background-header)',
    backgroundVioletSidebar: 'var(--color-violet-background-sidebar)',
    fontColor: 'var(--color-dark-primary)',
    inputColorDefault: 'var(--color-light-input)',
    inputColorActive: 'var(--color-light-input-active)',
  },
};

const themeViolet = {
  color: {
    backgroundVioletHeader: 'var(--color-violet-background-header)',
    backgroundVioletSidebar: 'var(--color-violet-background-sidebar)',
    defaultBoardBackground: 'var(--color-light-primary)',
    fontColor: 'var(--color-light-primary)',
    inputColorDefault: 'var(--color-violet-input)',
    inputColorActive: 'var(--color-violet-input-active)',
  },
};

// const themeDark = {
//   color: {
//     backgroundBlack: 'var(--color-dark-primary)',
//     themeColor: 'var(--color-dark-primary)',
//     defaultBoardBackground: 'var(--color-light-primary)',
//     fontColor: 'var(--color-light-primary)',
//     inputColorDefault: 'var(--color-dark-input)',
//     inputColorActive: 'var(--color-dark-input-active)',
//   },
// };



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


export const useTheme = () => useContext(themeContext);
export default themeContext;
