import Logo from '../SideBar/Logo/Logo';
import css from './SideBar.module.css';
import CreateNewBoard from './CreateNewBoard/CreateNewBoard';
import NeedHelp from '../SideBar/NeedHelp/NeedHelp';
import LogOut from '../SideBar/LogOut/LogOut';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useRef } from 'react';
// import Loader from '../Loader/Loader';

// const SideBar = ({viiwPortWidth, isOpen}) => {
const SideBar = () => {
  // const sideBarRef = useRef();

  // const allBoards = useSelector(функція для вибору дошки)
  // const {items, isLoading, error} = allBoards;

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(функція по типу fetch());
  // }, [dispatch, isOpe]);

  return (
    <div className={css.cont}>
      <div className={css.upperPart}>
        <Logo />
        <h3 className={css.myBoardsTitle}>My boards</h3>
        <CreateNewBoard />
        {/* error, isLoading */}
      </div>
      <div className={css.bottomPart}>
        <NeedHelp />
        <LogOut />
      </div>
    </div>
  );
};

export default SideBar;
