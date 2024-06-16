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
  List,
  ListItem,
  Box,
} from '@mui/material';
import sprite from '../../assets/sprite.svg';
import { ColumnModal } from '../ColumnModal/ColumnModal';
import { selectColumn } from '../../redux/columns/selectors';
import { selectCardsForColumn } from '../../redux/task/selectors.js';
import { deleteColumn } from '../../redux/columns/operations';
import CreateCardModalWindow from '../CreateCardModalWindow/CreateCardModalWindow.jsx';
import {
  StyledButton,
  StyledSvgIcon,
  StyledTypography,
} from '../MUIstyled/styledComponent.js';
import { StyledPlusIcon } from '../MUIstyled/commonComponent.jsx';
import TaskCard from './TaskCard/taskCard.jsx';
import { selectFilter } from '../../redux/filter/selector.js';

export const Column = props => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [isColumnModalOpened, setisColumnModalOpened] = useState(false);
  const ref = useRef();
  const column = useSelector(state => selectColumn(state, props.columnId));
  const [IsOpen, setIsOpen] = useState(false);
  const cards = useSelector(state => selectCardsForColumn(state, column._id));
  const selectedFilter = useSelector(selectFilter);

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

  const filteredCards =
    selectedFilter === 'show-all'
      ? cards
      : cards.filter(card => card.priority === selectedFilter);

  return (
    <Stack
      sx={{ height: '80vh', width: '350px' }}
      gap={2}
      direction="column"
      justifyContent="space-between"
      alignItems="stretch"
    >
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
      <Box
        sx={{
          maxHeight: '65vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingRight: '14px',
          '&.MuiBox-root': {
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
              borderRadius: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.color.defaultBoardBackground,
              outline: `1px solid slategrey`,
              borderRadius: '8px',
            },
          },
        }}
      >
        <List>
          {filteredCards?.map((task, index) => (
            <TaskCard key={index} cardInfo={task} />
          ))}
        </List>
      </Box>

      <StyledButton
        onClick={() => handleOpenModal()}
        startIcon={<StyledPlusIcon backgroundColor="white" />}
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
