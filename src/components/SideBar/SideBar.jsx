import Logo from '../SideBar/Logo/Logo';
import css from './SideBar.module.css';
import CreateNewBoard from './CreateNewBoard/CreateNewBoard';
import NeedHelp from '../SideBar/NeedHelp/NeedHelp';
import LogOut from '../SideBar/LogOut/LogOut';
// import BoardsList from './BoardsList/BoardsList';
import BoardList from './BoardsList/BoardList';
import { useSelector } from 'react-redux';
import { useRef, forwardRef, useEffect } from 'react';
import Loader from '../Loader/Loader';
import { selectAllBoards } from '../../redux/boards/selectors';
import clsx from 'clsx';
import { selectTheme } from '../../redux/theme/selectors';

const SideBar = forwardRef(({ viewPortWidth, isOpen, onClose }, ref) => {
  const sideBarRef = useRef();
  const allBoards = useSelector(selectAllBoards);
  const { items, isLoading, error } = allBoards;
  const selectedTheme = useSelector(selectTheme);

  useEffect(() => {
    const handleMouseDown = e => {
      if (sideBarRef.current && !sideBarRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen && viewPortWidth < 768) {
      document.addEventListener('mousedown', handleMouseDown);
    } else {
      document.removeEventListener('mousedown', handleMouseDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isOpen, viewPortWidth, onClose]);

  const handleSidebarClick = event => {
    event.stopPropagation();
  };

  return (
    <>
      <div
        className={clsx(css.overlay, css[selectedTheme], {
          [css.open]: isOpen,
        })}
        onClick={onClose}
      ></div>
      <div
        ref={ref}
        className={clsx(css.sidebar, { [css.open]: isOpen })}
        onClick={handleSidebarClick}
      >
        <div className={css.cont} ref={sideBarRef}>
          <div className={css.upperPart}>
            <Logo />
            <h3 className={css.myBoardsTitle}>My boards</h3>
            <CreateNewBoard />
            {error && <p>{error}</p>}
            {isLoading && <Loader />}
            {items?.length === 0 ? '' : <BoardList />}
          </div>
          <div className={css.bottomPart}>
            <NeedHelp />
            <LogOut />
          </div>
        </div>
      </div>
    </>
  );
});

// const SideBar = ({viewPortWidth, isOpen}) => {
//   const sideBarRef = useRef();
// // import { forwardRef } from 'react';
// // // import { useEffect } from 'react';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import { useRef } from 'react';
// // // import Loader from '../Loader/Loader';
// // import clsx from 'clsx';
// // const SideBar = forwardRef( ({ isOpen }, ref) => {

//   const allBoards = useSelector(selectAllBoards);
//   const {items, isLoading, error} = allBoards;

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchAllBoards());
//   }, [dispatch, isOpen]);

//   useEffect(() => {
//     const handleMouseDown= (e) => {
//       if (!sideBarRef.current.contains(e.target)) {
//         isOpen(false);
//       }
//     };
//     if (isOpen && !viewPortWidth) {
//       document.addEventListener('mousedown', handleMouseDown);
//     } else {
//       document.removeEventListener('mousedown', handleMouseDown);
//     } return () => {
//       document.removeEventListener('mousedown', handleMouseDown);
//     };
//   }, [isOpen, viewPortWidth]);
//   // const dispatch = useDispatch();
//     // const handleSidebarClick = event => {
//     //   event.stopPropagation();
//     // };

//   return (
//       <div className={clsx(css.sidebar, { [css.open]: isOpen })} ref={sideBarRef}>
//       <div className={css.cont}>
//         <div className={css.upperPart}>
//           <Logo />
//           <h3 className={css.myBoardsTitle}>My boards</h3>
//           <CreateNewBoard />
//           {error && <p>{error}</p>}
//           {isLoading && <Loader />}
//           {items?.length === 0 ? '' : <BoardList />}
//         </div>
//         <div className={css.bottomPart}>
//           <NeedHelp />
//           <LogOut />
//         </div>
//       </div>
//       <div
//         className={clsx(css.overlay, { [css.open]: isOpen })}
//         onClick={onClose}
//       ></div>
//     </div>
//   );

// <div className={css.cont}>
//   <div className={css.upperPart}>
//     <Logo />
//     <h3 className={css.myBoardsTitle}>My boards</h3>
//     <CreateNewBoard />
//     {error && <p>{error}</p>}
//     {isLoading && <Loader/>}
//     {items?.lenght === 0 ? '' : <BoardList/>}
//     {/* <BoardList/> */}

//   </div>
//   </div>
//   <div className={css.bottomPart}>
//     <NeedHelp />
//     <LogOut />
//   </div>
//   <div
//     className={clsx(css.overlay, { [css.open]: isOpen })}
//     onClick={onClose}
//   ></div>
// <
//   ref={ref}
//   className={clsx(css.sidebar, { [css.open]: isOpen })}
//   onClick={handleSidebarClick}
// >
// <div className={css.cont}>
//   <div className={css.upperPart}>
//     <Logo />
//     <h3 className={css.myBoardsTitle}>My boards</h3>
//     <CreateNewBoard />
//     {/* error, isLoading */}
//   </div>
//   <div className={css.bottomPart}>
//     <NeedHelp />
//     <LogOut />
//   </div>
// </div>
// </div>

//   );
// };
SideBar.displayName = 'SideBar';

export default SideBar;
