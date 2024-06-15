import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar';

import Header from '../../components/Header/Header';

import {
  selectAllBoards,
  selectCurrentBoard,
} from '../../redux/boards/selectors';
import { fetchAllBoards } from '../../redux/boards/operations';
import { Navigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { DetectScreen } from './DetectScreen';
import { setBackgrounds, setCurrentBoard } from '../../redux/boards/slice';
import { EmptyBoard } from '../../components/Board/EmptyBoard';

import axios from 'axios';

import { setTheme } from '../../redux/theme/themeSlice';
import { useToggle } from '../../hooks/useToggle';

export default function Home() {
  const dispatch = useDispatch();
  const boards = useSelector(selectAllBoards);
  const currentBoard = useSelector(selectCurrentBoard);
  const { isOpen, open, close } = useToggle();
  const sidebarRef = useRef(null);

  useEffect(() => {
    dispatch(fetchAllBoards());
    (async () => {
      const list = await axios.get(
        'https://res.cloudinary.com/duchyrp8f/image/list/bg.json'
      );
      dispatch(setBackgrounds([...list.data.resources]));
    })();
  }, [dispatch]);

  useEffect(() => {
    if (boards.length > 0) {
      const whichBoard = currentBoard.title ? currentBoard : boards[0];
      dispatch(setCurrentBoard(whichBoard));
    }
  }, [dispatch, boards, currentBoard]);

  useEffect(() => {
    dispatch(setTheme('dark'));
  }, [dispatch]);

  const handleContainerClick = event => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      close();
    }
  };

  return (
    <Stack
      direction="row"
      height="100vh"
      display="flex"
      onClick={handleContainerClick}
    >
      <DetectScreen />
      <SideBar ref={sidebarRef} isOpen={isOpen} onClose={close} />
      <Stack
        justifyContent="flex-start"
        maxWidth={{
          xs: '368px',
          sm: '768px',
          xl: '1180px',
        }}
      >
        <Header toggleSidebar={open} closeSidebar={close} />
        {boards.length === false ? (
          <EmptyBoard />
        ) : (
          currentBoard.title && <Navigate to={'/home/' + currentBoard.title} />
        )}
        <Outlet />
      </Stack>
    </Stack>
  );
}
