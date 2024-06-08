import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, setTheme } from '../../redux/theme/themeSlice';
import './Header.module.css';

const Header = () => {
  const selectedTheme = useSelector(selectTheme);
  console.log(selectedTheme);
  const dispatch = useDispatch();

  const handleSelectChange = event => {
    dispatch(setTheme(event.target.value));
  };

  return (
    <header>
      <div>
        <label htmlFor="theme-select">Select Theme:</label>
        <select
          id="theme-select"
          value={selectedTheme}
          onChange={handleSelectChange}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="violet">Violet</option>
        </select>
      </div>
    </header>
  );
};

export default Header;

//import UserInfo from '../UserInfo/UserInfo';
//import { useSelector, useDispatch } from 'react-redux';
//import css from './Header.module.css';

//import { selectTheme, setTheme } from '../../redux/theme/themeSlice'; // Assuming you have a themeSlice

//import { useTheme } from '../../components/Theme/Theme';
//import PropTypes from 'prop-types';
// import './Header.module.css'; // Assuming you have CSS for styling
//import { useContext } from 'react';
//import {ThemeChangeProvider} from '../../themeContext';
// import { useContext} from 'react';
// import  themeContext  from '../../themeContext';
// import { useDispatch } from 'react-redux';
//import { useTheme } from '@emotion/react';

// const Header = () => {
//   const themeValue = useContext(ThemeContext);
//    console.log(themeValue);
// // const { theme, toggleTheme } = useTheme();
//   const handleSelectChange = event => {
//     console.log(event.target.value);
//     themeValue.toggleTheme(event.target.value);
//   };
// const handleThemeChange = event => {
//   toggleTheme(event.target.value);
// };
//const { theme, toggleTheme } = useContext(themeContext);

// const handleSelectChange = event => {
//   // console.log(event.target.value);
//   // dispatch()
//   // toggleTheme(event.target.value);

// };
//     const dispatch = useDispatch();

//     const handleSelectChange = event => {
//       dispatch(setTheme(event.target.value));
//     };
//   return (
//     <header>
//       <div>
//         <label htmlFor="theme-select">Select Theme:</label>
//         {/* <select id="theme-select" onChange={handleSelectChange}> */}
//         <select id="theme-select" value={theme} onChange={handleSelectChange}>
//           <option value="light">Light</option>
//           <option value="dark">Dark</option>
//           <option value="violet">Violet</option>
//         </select>
//       </div>
//       {/* <USerInfo/> */}
//     </header>
//   );
// };

// export default Header;

// Header.propTypes = {
//   handleThemeChange: PropTypes.func.isRequired,
// };

// const Header = () => {
//   const theme = useSelector(selectTheme);
//   const dispatch = useDispatch();

//   const handleThemeChange = event => {
//     dispatch(setTheme(event.target.value));
//   };

//   return (
//     <header className={css.header}>
//       <div className="left">
//         <label htmlFor="theme-select">Theme:</label>
//         <select id="theme-select" value={theme} onChange={handleThemeChange}>
//           <option value="light">Light</option>
//           <option value="dark">Dark</option>
//           <option value="violet">Violet</option>
//         </select>
//       </div>
//       {/* <UserInfo /> */}
//     </header>
//   );
// };

// import PropTypes from 'prop-types';

// const Header = ({ handleThemeChange }) => {
//   return (
//     <header>
//       <div>
//         <button onClick={() => handleThemeChange('dark')}>Dark </button>
//         <button onClick={() => handleThemeChange('violet')}>Violet
//         </button>
//         <button onClick={() => handleThemeChange('light')}>Light</button>
//       </div>
//     </header>
//   );
// };

// Header.propTypes = {
//   handleThemeChange: PropTypes.func.isRequired,
// };
