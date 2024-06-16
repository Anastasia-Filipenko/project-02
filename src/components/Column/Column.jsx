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
<<<<<<< Updated upstream
import { selectFilter } from '../../redux/filter/selector.js';
=======
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
  const filteredCards =
    selectedFilter === 'show-all'
      ? cards
      : cards.filter(card => card.priority === selectedFilter);
=======
  const cardItem = {
    column: "666dfc948c1e9a831ca158d9",
    createdAt: "2024-06-15T22:48:28.937Z",
    deadline: "2024-06-15T22:48:13.206Z",
    description: "На Олімпіаштадіон у Берліні збірні Іспанії та Хорватії зустрілися в рамках другого ігрового дня першого туру групового етапу Євро-2024 у Німеччині. У стартовому складі колективу Луїса де ла Фуенте у віці 16 років і 338 днів опинився правий вінгер Ламін Ямал. Так, іспанець став наймолодшим гравцем в історії чемпіонатів Європи.",
    priority: "Medium",
    title: "qwerty",
    updatedAt: "2024-06-15T22:48:28.937Z",
    _id: "666e1a3c8c1e9a831ca17346"
  }
>>>>>>> Stashed changes

  return (
    <Stack
      sx={{ height: '80vh', width: '340px' }}
      gap={2}
      direction="column"
      justifyContent="space-between"
      alignItems="stretch"
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'row',
          overflow: 'visible',
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
            fontSize: '14px',
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
<<<<<<< Updated upstream
      <Box
        sx={{
          maxHeight: '65vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingRight: '10px',
          '&.MuiBox-root': {
            '&::-webkit-scrollbar': {
              width: '10px',
            },
            '&::-webkit-scrollbar-track': {
              boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.color.defaultBoardBackground,
              outline: `1px solid slategrey`,
            },
          },
        }}
=======
      <TaskCard cardInfo={cardItem} />

      {/* {props.column?.tasks.map((task, index) => (
                    <Task key={index} task={task} columnId={props.column._id}/>
                  ))} */}

      <StyledButton
        onClick={() => handleOpenModal()}
        startIcon={
          <StyledPlusIcon backgroundColor='white'/>
        }
>>>>>>> Stashed changes
      >
        <List sx={{ width: '334px' }}>
          {filteredCards?.map((task, index) => (
            <TaskCard key={index} cardInfo={task} />
          ))}
        </List>
      </Box>
      <StyledButton
        sx={{
          maxWidth: '334px',
        }}
        onClick={() => handleOpenModal()}
        startIcon={<StyledPlusIcon backgroundColor="white" />}
      >
        <StyledTypography
          sx={{ fontSize: '14px ', color: theme.color.fontColorSecondary }}
        >
          Add another card
        </StyledTypography>
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
