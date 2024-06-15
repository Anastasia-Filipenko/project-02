import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardHeader,
  IconButton,
  CardActions,
  Modal,
  Stack,
  useTheme,
  styled,
} from '@mui/material';
import sprite from '../../assets/sprite.svg';
import { ColumnModal } from '../ColumnModal/ColumnModal';
import { selectColumn } from '../../redux/columns/selectors';
import { deleteColumn } from '../../redux/columns/operations';
import CreateCardModalWindow from '../CreateCardModalWindow/CreateCardModalWindow.jsx';
import { StyledButton, StyledSvgIcon, StyledTypography } from '../MUIstyled/styledComponent.js';
import { StyledPlusIcon } from '../MUIstyled/commonComponent.jsx';

export const Column = props => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [isColumnModalOpened, setisColumnModalOpened] = useState(false);
  const ref = useRef();
  const column = useSelector(state => selectColumn(state, props.columnId));
  const [IsOpen, setIsOpen] = useState(false);

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleModalClose() {
    setIsOpen(false);
  }

  const handledelete = () => {
    dispatch(deleteColumn({ boardId: props.boardId, columnId: column._id }));
  };

  const StyledIconButton = styled(IconButton)({
    padding: 0,
  });

  return (
    <Stack sx={{ height: '75vh' }} gap={2} justifyContent="space-between">
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '334px',
          height: '56px',
          backgroundColor: theme.color.themeColor,
        }}
      >
        <CardHeader
          title={column.title}
          titleTypographyProps={{
            color: theme.color.fontColor,
          }}
        />
        <CardActions>
          <StyledIconButton onClick={() => setisColumnModalOpened(true)}>
            <StyledSvgIcon>
              <use xlinkHref={`${sprite}#icon-pen`}></use>
            </StyledSvgIcon>
          </StyledIconButton>
          <StyledIconButton onClick={handledelete}>
            <StyledSvgIcon>
              <use xlinkHref={`${sprite}#icon-trash`}></use>
            </StyledSvgIcon>
          </StyledIconButton>
        </CardActions>
      </Card>

      {/* {props.column?.tasks.map((task, index) => (
                    <Task key={index} task={task} columnId={props.column._id}/>
                  ))} */}

      <StyledButton
        onClick={() => handleOpenModal()}
        startIcon={
          <StyledPlusIcon backgroundColor='white'/>
        }
      >
        <StyledTypography>Add another card</StyledTypography>
      </StyledButton>

      {IsOpen && (
        <CreateCardModalWindow
          isOpen={IsOpen}
          handleModalClose={handleModalClose}
          columnId={column._id}
        />
      )}

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
