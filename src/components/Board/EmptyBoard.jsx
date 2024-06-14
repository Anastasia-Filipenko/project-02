import { Stack, Typography, Link, Modal } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BoardModal } from '../BoardModal/BoardModal';
import { useState, useRef } from 'react';

export const EmptyBoard = () => {
  const theme = useTheme();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const ref = useRef();

  return (
    <>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: 1,
          height: '100vh',
          backgroundColor: theme.color.defaultBoardBackground,
        }}
      >
        <Typography
          width={486}
          align="center"
          fontSize={14}
          color={theme.color.fontColor}
        >
          Before starting your project, it is essential to
          <Link
            component="button"
            variant="body2"
            underline="none"
            onClick={() => {
              setModalIsOpen(true);
            }}
          >
            <Typography color={theme.color.fontColor} whiteSpace="pre-wrap">
                {' '}create a board{' '}
            </Typography>
          </Link>
          to visualize and track all the necessary tasks and milestones. This
          board serves as a powerful tool to organize the workflow and ensure
          effective collaboration among team members.
        </Typography>
      </Stack>

      <Modal
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        disableAutoFocus={true}
      >
        <BoardModal
          ref={ref}
          selectedIcon={selectedIcon}
          setSelectedIcon={val => setSelectedIcon(val)}
          closeModal={() => setModalIsOpen(false)}
        />
      </Modal>
    </>
  );
};
