import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { useTheme } from '@mui/material/styles';

export default function ModalLogOut({ user, close, logout }) {
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleLogout = () => {
    dispatch(logout);
  };

  return (
    <Box
      value={theme.name}
      sx={{
        backgroundColor: `${theme.color.defaultBoardBackground}`,
        borderRadius: '15px',
      }}
    >
      <Box
        sx={{
          // border: '1.5px solid',
          padding: '15px',
          borderRadius: '15px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            color: 'red',
          }}
        >
          <ErrorIcon
            sx={{ fontSize: '40px', color: '#e36f71', marginBottom: '20px' }}
          />
        </Box>
        <Box
          sx={{
            fontSize: 16,
            color: '#524f4e',
            textAlign: 'center',
            border: '2px solid #e36f71',
            borderRadius: '8px',
            padding: '6px',
            marginBottom: '30px',
            fontFamily: '',
          }}
        >
          <Typography
            sx={{
              fontSize: 18,
              color: `${theme.color.colorTextBlack}`,
              textAlign: 'center',
              fontWeight: '500',
            }}
          >
            Are you sure you want to logout?
          </Typography>
        </Box>

        <Box
          sx={{
            display: ' flex',
            justifyContent: 'space-evenly',
          }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#e36f71',
              width: '100px',
              fontWeight: '600',
              transition: 'transform 600ms',
              '&:hover': {
                transform: 'scale(1.1)',
                backgroundColor: 'red',
              },
            }}
            onClick={handleLogout}
          >
            Yes
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              paddingInline: '30px',
              backgroundColor: `${theme.color.btnColorHover}`,
              width: '100px',
              fontWeight: '600',
              transition: 'transform 600ms',
              '&:hover': {
                transform: 'scale(1.1)',
                backgroundColor: `${theme.color.inputColorDefault}`,
              },
            }}
            onClick={close}
          >
            No
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
