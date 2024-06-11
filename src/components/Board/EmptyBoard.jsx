import { Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const EmptyBoard = () => {
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ width: 1, height: '100vh', backgroundColor: theme.color.defaultBoardBackground }}
    >
      <Typography width={486} align="center" fontSize={14} color={theme.color.fontColor}>
        Before starting your project, it is essential to create a board to
        visualize and track all the necessary tasks and milestones. This board
        serves as a powerful tool to organize the workflow and ensure effective
        collaboration among team members.
      </Typography>
    </Stack>
  );
};
