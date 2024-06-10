import { useState } from 'react';
import {
  Card,
  CardHeader,
  IconButton,
  Grid,
  Button,
  Box,
  CardActions,
  Modal,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import sprite from '../../assets/sprite.svg';
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskModal } from '../TaskModal/TaskModal';

export const Column = props => {
const [isTaskModalOpened, setIsTaskModalOpened] = useState(false);

  return (
    <Grid item xs={3}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <CardHeader title={props.columnTitle} />
        <CardActions>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>

      <Button
        fullWidth
        onClick={() => setIsTaskModalOpened(true)}
        type="button"
        variant="contained"
        sx={{
          backgroundColor: '#bedbb0',
          textTransform: 'none',
          "&:hover": { backgroundColor: "#bedbb0" }
        }}
        startIcon={
          <Box
            sx={{
              display: 'flex',
              borderRadius: '8px',
              backgroundColor: 'black',
              width: 28,
              height: 28,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <svg fill="white" stroke="white" width="14px" height="14px">
              <use xlinkHref={`${sprite}#icon-plus`}></use>
            </svg>
          </Box>
        }
      >
        Add Task
      </Button>

      <Modal open={isTaskModalOpened} onClose={() => setIsTaskModalOpened(false)}>
        <TaskModal closeModal={() => setIsTaskModalOpened(false)}/>
      </Modal>
    </Grid>
  );
};
