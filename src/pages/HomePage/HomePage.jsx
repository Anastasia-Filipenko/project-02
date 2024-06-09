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
import { AppBar, Box, Stack, Toolbar, Typography } from '@mui/material';
import { DetectScreen } from './DetectScreen';
import { setCurrentBoard } from '../../redux/boards/slice';

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
    <Stack direction="row" spacing={2} height="100vh">
      <DetectScreen />
      <Header/>
      <SideBar />
      <Box sx={{ width: '90%' }}>
        {/* <AppBar width="90%" sx={{ backgroundColor: 'grey' }}>
            <Toolbar></Toolbar>
          </AppBar> */}
        {boards.length == 0 ? (
          <Typography>Please create first board</Typography>
        ) : (
          <Navigate to={'/home/' + currentBoard.title} />
        )}
        <Outlet />
      </Box>
    </Stack>

  );
}
