import { createContext, useState, useEffect, useContext } from 'react';

const themeContext = createContext();
const themeDark = {
  name: 'dark',
  color: {
    backgroundBlackHeader: 'var( --background-header-dark)',
    backgroundBlackSidebar: 'var( --background-sidebar-dark)',
    backgroundBlackBody: 'var(--background-body)',
    colorTextBlack: 'var( --text-color-dark)',
    themeColor: 'var(--color-dark-primary)',
    defaultBoardBackground: 'var(--color-dark-background)',
    fontColor: 'var(--color-light-primary)',
    fontColorSecondary: 'var(--color-violet-text-secondary)',
    inputColorDefault: 'var(--color-dark-btn)',
    inputColorActive: 'var(--color-dark-input-active)',
    iconBackgroundColor: 'var(--color-dark-primary)',
    iconStroke: 'var(--color-light-primary)',
    iconColumnBackgroundColor: 'var(--color-light-primary)',
    iconColumnStroke: 'var(--color-dark-primary)',
    btnColumnBackround: 'var(--color-dark-btn-secondary)',
    btnColorHover: 'var(--color-dark-btn-hover)',
    btnColorLogOut: 'var(--color-label-medium)',
  },
};
const themeLight = {
  name: 'light',
  color: {
    backgroundLight: 'var(--color-light-primary)',
    themeColor: 'var(--color-light-primary)',
    defaultBoardBackground: 'var(--color-light-background)',
    backgroundVioletHeader: 'var(--color-violet-background-header)',
    backgroundVioletSidebar: 'var(--color-violet-background-sidebar)',
    fontColor: 'var(--color-dark-primary)',
    fontColorSecondary: 'var(--color-violet-text-secondary)',
    inputColorDefault: 'var(--color-light-btn)',
    inputColorActive: 'var(--color-light-btn-hover)',
    iconBackgroundColor: 'var(--color-dark-primary)',
    iconStroke: 'var(--color-light-primary)',
    iconColumnBackgroundColor: 'var(--color-dark-primary)',
    iconColumnStroke: 'var(--color-light-primary)',
    activeItem: 'var(--color-light-active-item)',
    btnActive: 'var(--color-btn-active-item)',
    btnColumnBackround: 'var(--color-light-btn-secondary)',
    btnColorHover: 'var(--color-dark-btn-hover)',
    btnColorLogOut: 'var(--color-label-medium)',
  },
};

const themeViolet = {
  name: 'violet',
  color: {
    themeColor: 'var(--color-light-primary)',
    backgroundVioletHeader: 'var(--color-violet-background-header)',
    backgroundVioletSidebar: 'var(--color-violet-background-sidebar)',
    defaultBoardBackground: 'var(--color-violet-background)',
    fontColor: 'var(--color-violet-text-secondary)',
    fontColorSecondary: 'var(--color-violet-text-primary)',
    inputColorDefault: 'var(--color-violet-btn)',
    inputColorActive: 'var(--color-violet-btn-board-hover)',
    iconBackgroundColor: 'var(--color-light-primary)',
    iconStroke: 'var(--color-dark-primary)',
    iconColumnBackgroundColor: 'var(--color-violet-btn)',
    iconColumnStroke: 'var(--color-light-primary)',
    btnColumnBackround: 'var(--color-violet-btn-secondary)',
    btnColorHover: 'var(--color-violet-btn-hover)',
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
