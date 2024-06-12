import { useState, useRef } from 'react';
import {
  Card,
  CardHeader,
  IconButton,
  Grid,
  Button,
  Box,
  CardActions,
  Modal,
  Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import sprite from '../../assets/sprite.svg';
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskModal } from '../TaskModal/TaskModal';
import { ColumnModal } from '../ColumnModal/ColumnModal';

export const Column = props => {
const [isTaskModalOpened, setIsTaskModalOpened] = useState(false);
const [isColumnModalOpened, setisColumnModalOpened] = useState(false);
const ref = useRef();
console.log('column', props.column)

  return (
    <Stack sx={{ height: '75vh' }} justifyContent="space-between">
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '334px',
          height: '56px'
        }}
      >
        <CardHeader title={props.column.title}/>
        <CardActions>
          <IconButton onClick={() => setisColumnModalOpened(true)}>
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>

      {/* {props.column?.tasks.map((task, index) => (
                    <Task key={index} task={task} columnId={props.column._id}/>
                  ))} */}

      <Button
        onClick={() => setIsTaskModalOpened(true)}
        type="button"
        variant="contained"
        sx={{
          backgroundColor: '#bedbb0',
          textTransform: 'none',
          "&:hover": { backgroundColor: "#bedbb0" },
          height: '56px',
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
        Add another card
      </Button>

      <Modal open={isTaskModalOpened} onClose={() => setIsTaskModalOpened(false)}>
        <TaskModal closeModal={() => setIsTaskModalOpened(false)} columnId={props.column._id}/>
      </Modal>

      <Modal
                open={isColumnModalOpened}
                onClose={() => setisColumnModalOpened(false)}
                disableAutoFocus={true}
              >
                <ColumnModal
                  ref={ref}
                  closeModal={() => setisColumnModalOpened(false)}
                  boardId={props.boardId}
                  title={props.column.title}
                  columnId={props.column._id}
                  editColumn={true}
                />
              </Modal>
    </Stack>
  );
};
