import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardHeader,
  IconButton,
  Button,
  Box,
  CardActions,
  Modal,
  Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import sprite from '../../assets/sprite.svg';
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskModal } from '../TaskModal/TaskModal';
import { ColumnModal } from '../ColumnModal/ColumnModal';
import { useSelector } from 'react-redux';
import { selectColumn } from '../../redux/columns/selectors';
import { deleteColumn } from '../../redux/columns/operations';
import CreateCardModalWindow from '../CreateCardModalWindow/CreateCardModalWindow.jsx';

export const Column = props => {
  const dispatch = useDispatch();
  // const [isTaskModalOpened, setIsTaskModalOpened] = useState(false);
  const [isColumnModalOpened, setisColumnModalOpened] = useState(false);
  const ref = useRef();
  const column = useSelector(state => selectColumn(state, props.columnId));
const [IsOpen, setIsOpen] = useState(false); 

function handleOpenModal() {
  setIsOpen(true);
}

function handleModalClose() {
  setIsOpen(false);

  const handledelete = () => {
    dispatch(deleteColumn({ boardId: props.boardId, columnId: column._id }));
  };

  return (
    <Stack sx={{ height: '75vh' }} justifyContent="space-between">
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '334px',
          height: '56px',
        }}
      >
        <CardHeader title={column.title} />
        <CardActions>
          <IconButton onClick={() => setisColumnModalOpened(true)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handledelete} >
            <DeleteIcon/>
          </IconButton>
        </CardActions>
      </Card>

      {/* {props.column?.tasks.map((task, index) => (
                    <Task key={index} task={task} columnId={props.column._id}/>
                  ))} */}

      <Button
        // onClick={() => setIsTaskModalOpened(true)}
        onClick={() => handleOpenModal()}
        type="button"
        variant="contained"
        sx={{
          backgroundColor: '#bedbb0',
          textTransform: 'none',
          '&:hover': { backgroundColor: '#bedbb0' },
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

      {IsOpen && 
        <CreateCardModalWindow
          isOpen={IsOpen}
          handleModalClose={handleModalClose}
          columnId={props.column._id}
        />
      }

      {/* <Modal
        open={isTaskModalOpened}
        onClose={() => setIsTaskModalOpened(false)}
      >
        <TaskModal
          closeModal={() => setIsTaskModalOpened(false)}
          columnId={column._id}
        />
      </Modal> */}

      <Modal
        open={isColumnModalOpened}
        onClose={() => setisColumnModalOpened(false)}
        disableAutoFocus={true}
      >
        <ColumnModal
          ref={ref}
          closeModal={() => setisColumnModalOpened(false)}
          boardId={props.boardId}
          title={column.title}
          columnId={column._id}
          editColumn={true}
        />
      </Modal>
    </Stack>
  );
};
