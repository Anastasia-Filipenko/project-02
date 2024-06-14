import styled from '@mui/material/styles/styled';

const MenuList = styled('div')(({ theme, selectedTheme }) => ({
  backgroundColor:
    selectedTheme === 'light' || selectedTheme === 'violet'
      ? '#ffffff'
      : '#111111',
  paddingTop: theme.spacing(0),
  paddingBottom: theme.spacing(0),
  color:
    selectedTheme === 'light' || selectedTheme === 'violet'
      ? '#000000'
      : '#ffffff',
  ...(selectedTheme === 'light' || selectedTheme === 'violet'
    ? { padding: '10px' }
    : { padding: '5px' }),
}));

export default MenuList;
    