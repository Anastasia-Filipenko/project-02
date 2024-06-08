import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar';
import { selectAllBoards } from '../../redux/boards/selectors';
import { fetchAllBoards } from '../../redux/boards/operations';
import { Navigate } from 'react-router-dom';
import { AppBar, Box, Stack, Toolbar, Typography } from '@mui/material';

export default function Home() {
  const dispatch = useDispatch();
  const boards = useSelector(selectAllBoards);

  useEffect(() => {
    dispatch(fetchAllBoards());
  }, [dispatch]);
  
  return (
    <Stack direction="row" spacing={2} height="100vh">
      <SideBar />
      <Box sx={{ width: '90%' }}>
        {/* <AppBar width="90%" sx={{ backgroundColor: 'grey' }}>
            <Toolbar></Toolbar>
          </AppBar> */}
        {boards.length == 0 ? (
          <Typography>Please create first board</Typography>
        ) : (
          <Navigate to={'/home/'+ boards[0].title}/>
        )}
        <Outlet />
      </Box>
    </Stack>
  );
}
