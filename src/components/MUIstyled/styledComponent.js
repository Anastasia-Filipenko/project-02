import {
  Card,
  Button,
  Box,
  SvgIcon,
  TextField,
  Typography,
} from '@mui/material';

import { styled } from '@mui/system';

export const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.color.inputColorDefault,
  textTransform: 'none',
  paddingY: '10px',
  '&.MuiButton-root': {
    '&:hover': {
      backgroundColor: theme.color.inputColorActive,
    },
  },
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.color.fontColor,
}));

export const StyleBoxModal = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  disableAutoFocus: true,
});

export const StyledCardModal = styled(Card)(({ theme }) => ({
  width: 350,
  bgcolor: 'white',
  border: '0px solid #000',
  borderRadius: '8px',
  backgroundColor: `${theme.color.themeColor}`,
}));

export const StyledSvgIcon = styled(SvgIcon)(({ theme }) => ({
  '&.MuiSvgIcon-root': {
    width: '14px',
    heigth: '14px',
    stroke: theme.color.fontColor,
    fillOpacity: '0.0',
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  autoFocus: true,
  fullWidth: true,
  '& .MuiInputBase-root': {
    color: `${theme.color.fontColor}`,
  },
  '& .MuiInputBase-root.MuiOutlinedInput-root': {
    '&.Mui-focused': {
      '.MuiOutlinedInput-notchedOutline': {
        borderColor: `${theme.color.inputColorDefault}`,
      },
    },
    '&:hover': {
      '.MuiOutlinedInput-notchedOutline': {
        borderColor: `${theme.color.inputColorActive}`,
      },
    },
  },
  paddingBottom: '24px',
}));

export const StyledSvgBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  borderRadius: '8px',
  backgroundColor: theme.color.iconBackgroundColor,
  width: 28,
  height: 28,
  justifyContent: 'center',
  alignItems: 'center',
}));

export const StyledSvgBoxColumn = styled(Box)(({ theme }) => ({
  display: 'flex',
  borderRadius: '8px',
  backgroundColor: theme.color.iconColumnBackgroundColor,
  width: 28,
  height: 28,
  justifyContent: 'center',
  alignItems: 'center',
}));

export const StyledSvg = styled('svg')(({ theme }) => ({
  stroke: theme.color.iconStroke,
  width: '14px',
  height: '14px',
}));

export const StyledColumnSvg = styled('svg')(({ theme }) => ({
    stroke: theme.color.iconColumnStroke,
    width: '14px',
    height: '14px',
  }));
