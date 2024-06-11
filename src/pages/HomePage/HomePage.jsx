import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar';

import Header from '../../components/Header/Header';

import {
  selectAllBoards,
  selectCurrentBoard,
} from '../../redux/boards/selectors';
import { fetchAllBoards } from '../../redux/boards/operations';
import { Navigate } from 'react-router-dom';
import { Box, Stack, Typography, Card, CardContent } from '@mui/material';
import { DetectScreen } from './DetectScreen';
import { setCurrentBoard } from '../../redux/boards/slice';
import { EmptyBoard } from '../../components/Board/EmptyBoard';
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
  }, [dispatch]);

  useEffect(() => {
    if (boards.length > 0) {
      dispatch(setCurrentBoard(boards[0]));
    }
  }, [dispatch, boards]);

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
      height="100vh" display="flex"
      onClick={handleContainerClick}
    >
      <DetectScreen />
      <SideBar ref={sidebarRef} isOpen={isOpen} onClose={close} />
      <Stack justifyContent="flex-start" width="100vw">
        <Header toggleSidebar={open} closeSidebar={close} />
        {boards.length === false ? (
          <EmptyBoard />
        ) : (
          <Navigate to={'/home/' + currentBoard.title} />
        )}
        <Outlet />
      </Stack>
    </Stack>
  );
}
