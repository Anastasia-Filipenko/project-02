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

// import { useSelector } from 'react-redux';
// import { ThemeProvider } from 'styled-components';
// import { selectTheme } from '../../redux/theme/themeSlice';
// import { useEffect } from 'react';
// import PropTypes from 'prop-types';
// import {  getTheme, useTheme } from '../../themeContext';

// const Theme = ({ children }) => {
//   const selectedTheme = useSelector(selectTheme);
//   const { theme, toggleTheme } = useTheme();
// console.log(selectedTheme);

//   useEffect(() => {
//     toggleTheme(selectedTheme);
//   }, [selectedTheme, toggleTheme]);

//   // const handleThemeChange = newTheme => {
//   //   setTheme(newTheme);
//   // };

//   return (
//     <ThemeProvider theme={getTheme(theme)}>
//       {typeof children === 'function' ? children(toggleTheme) : children}

//     </ThemeProvider>
//   );
// };

// Theme.propTypes = {
//   children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
// };

// export default Theme;

// ThemeContext.js
//import  { createContext, useState, useContext, useEffect, Children } from 'react';
// import { useSelector } from 'react-redux';
// import { ThemeProvider } from 'styled-components';
// import { selectTheme } from '../../redux/theme/themeSlice';
// import { useState } from 'react';
// import PropTypes from 'prop-types';
// import { light } from '@mui/material/styles/createPalette';

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState('light');

//   const toggleTheme = newTheme => {
//     setTheme(newTheme);
//   };

//   useEffect(() => {
//     document.body.className = theme;
//   }, [theme]);

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);

//const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState('light');

//   const toggleTheme = newTheme => {
//     setTheme(newTheme);
//   };

//   useEffect(() => {
//     document.body.className = theme;
//   }, [theme]);

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);
// const theme = {
//   light: {
//     color: {
//       backgroundLight: 'var(--color-light-primary)',
//       backgroundVioletHeader: 'var( --color-violet-background-header)',
//       backgroundVioletSidbar: 'var ( --color-violet-background-sidebar)',
//     },
//   },
//   violet: {
//     color: {
//       backgroundVioletHeader: 'var( --color-violet-background-header)',
//       backgroundVioletSidebar: 'var ( --color-violet-background-sidebar)',
//     },
//   },
//   dark: {
//     color: {
//       backgroundBlack: 'var( --color-dark-primary)',
//     },
//   },
// };
// //  const handleThemeChange = selectedTheme => {
// //     setTheme(selectedTheme);
// //   };

// const Theme = ({ children }) => {
//   const themeType = useSelector(selectTheme);
//  // const [themeSelect, setTheme] = useState(selectedTheme);

//   // const getTheme = currentTheme => {
//   //   switch (currentTheme) {
//   //     case 'dark':
//   //       return themeDark;
//   //     case 'violet':
//   //       return themeViolet;
//   //     // case 'light':
//   //     default:
//   //       return themeLight;
//   //   }
//   // };

//   return (
//     <ThemeProvider theme={theme[themeType]}>{children}
//       {/* {typeof children === 'function' && children(handleThemeChange)} */}
//     </ThemeProvider>
//   );
// };

// // Theme.propTypes = {
// //   children: PropTypes.func.isRequired,
// // };

// export default Theme;

// import React, { createContext, useContext, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { ThemeProvider as StyledThemeProvider } from 'styled-components';
// import { selectTheme } from '../../redux/theme/themeSlice';
// import PropTypes from 'prop-types';

// const ThemeContext = createContext();

// const themeLight = {
//   color: {
//     backgroundLight: 'var(--color-light-primary)',
//     backgroundVioletHeader: 'var( --color-violet-background-header)',
//     backgroundVioletSidbar: 'var ( --color-violet-background-sidebar)',
//   },
// };

// const themeViolet = {
//   color: {
//     backgroundVioletHeader: 'var(--color-violet-background-header)',
//     backgroundVioletSidebar: 'var(--color-violet-background-sidebar)',
//   },
// };

// const themeDark = {
//   color: {
//     backgroundBlack: 'var(--color-dark-primary)',
//   },
// };

// const ThemeProvider = ({ children }) => {
//   const selectedTheme = useSelector(selectTheme);
//   const [theme, setTheme] = useState(selectedTheme);

//   const getTheme = theme => {
//     switch (theme) {
//       case 'dark':
//         return themeDark;
//       case 'violet':
//         return themeViolet;
//       case 'light':
//       default:
//         return themeLight;
//     }
//   };

//   const handleThemeChange = selectedTheme => {
//     setTheme(selectedTheme);
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, handleThemeChange }}>
//       <StyledThemeProvider theme={getTheme(theme)}>
//         {children}
//       </StyledThemeProvider>
//     </ThemeContext.Provider>
//   );
// };

// ThemeProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export const useTheme = () => useContext(ThemeContext);

// export default ThemeProvider;
