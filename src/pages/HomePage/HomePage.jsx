import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
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

export default function Home() {
  const dispatch = useDispatch();
  const boards = useSelector(selectAllBoards);
  const currentBoard = useSelector(selectCurrentBoard);

  useEffect(() => {
    dispatch(fetchAllBoards());
  }, [dispatch]);

  useEffect(() => {
    if (boards.length > 0) {
      dispatch(setCurrentBoard(boards[0]));
    }
  }, [dispatch, boards]);

  return (
    <Stack direction="row" height="100vh" display="flex">
      <DetectScreen />
      <SideBar />
      <Stack justifyContent="flex-start" width="100vw">
        <Header />
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
