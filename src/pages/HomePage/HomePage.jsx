import { Outlet } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar';
import { AppBar, Box, Stack, Toolbar } from '@mui/material';

export default function Home() {
  return (
    <Stack direction="row" spacing={2} height="100vh">
      <Box sx={{ width: '10%' }}>
        <SideBar />
      </Box>
      <Box sx={{ width: '90%' }}>
        <AppBar position="static">
          <Toolbar></Toolbar>
        </AppBar>
        <Outlet />
      </Box>
    </Stack>
  );
}
