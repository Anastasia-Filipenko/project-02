import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  selectCurrentBoard,
  selectIsLoading,
} from '../../redux/boards/selectors';
import { fetchCurrentBoard } from '../../redux/boards/operations';
import { useTheme } from '@mui/material/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Stack,
  CardMedia,
  Button,
  Modal,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { Column } from '../Column/Column';
import { generateBgUrl } from './utils';

import { selectCurrentScreen } from '../../redux/common/selectors';
import { ColumnModal } from '../ColumnModal/ColumnModal';
import Loader from '../Loader/Loader';

import sprite from '../../assets/sprite.svg';
import { StyledButton, StyledSvgIcon, StyledTypography } from '../MUIstyled/styledComponent';
import { StyledPlusIconColumn } from '../MUIstyled/commonComponent';

export default function Board() {
  const dispatch = useDispatch();
  const { boardTitle } = useParams();
  const board = useSelector(selectCurrentBoard);
  const currentScreen = useSelector(selectCurrentScreen);
  const [imgUrl, setImgUrl] = useState(null);
  const [openedBoardId, setOpenedBoardId] = useState();

  const [isColumnModalOpened, setisColumnModalOpened] = useState(false);
  const [isFiltersModalOpened, setisFiltersModalOpened] = useState(false);
  const theme = useTheme();
  const isLoading = useSelector(selectIsLoading);
  const ref = useRef();

  useEffect(() => {
    if (board) {
      if (board.title === boardTitle && board._id) {
        setImgUrl(generateBgUrl(board.background, currentScreen));
        setOpenedBoardId(board._id);
      }
    }
  }, [board, boardTitle, currentScreen]);

  useEffect(() => {
    if (openedBoardId) {
      dispatch(fetchCurrentBoard(openedBoardId));
    }
  }, [dispatch, openedBoardId]);

  const mediaSx = {
    height: '100%',
    backgroundColor: `${theme.color.defaultBoardBackground}`,
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && board && board.background && (
        <Card
          sx={{
            height: '100%',
            borderRadius: '0px',
          }}
        >
          <CardMedia image={imgUrl} sx={mediaSx}>
            <CardHeader
              title={board.title}
              titleTypographyProps={{
                color: theme.color.fontColor,
              }}
              action={
                <IconButton onClick={() => setisFiltersModalOpened(true)}>
                  <StyledSvgIcon>
                    <use xlinkHref={`${sprite}#icon-filter`}></use>
                  </StyledSvgIcon>
                  <Typography
                    pr="24px"
                    color={theme.color.fontColor}
                    fontSize={14}
                    ml="4px"
                  >
                    Filters
                  </Typography>
                </IconButton>
              }
            />

            <CardContent
              sx={{
                overflowX: 'auto',
                p: 0,
                mx: {
                  xs: '16px',
                  sm: '32px',
                },
                flexWrap: 'nowrap',
                '&.MuiCardContent-root': {
                  '&::-webkit-scrollbar': {
                    width: '20px'
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
            >
              <Stack direction="row" gap="32px">
                {board.columns?.map((column, index) => (
                  <Column
                    key={index}
                    columnId={column._id}
                    boardId={openedBoardId}
                  />
                ))}
                <Stack>
                  <StyledButton
                    onClick={() => setisColumnModalOpened(true)}
                    sx={{
                      backgroundColor: theme.color.defaultBoardBackground,
                      textTransform: 'none',
                      padding: '10px',
                      width: '334px',
                      height: '56px',
                    }}
                    fullWidth
                    startIcon={
                      <StyledPlusIconColumn />
                    }
                  >
                    <StyledTypography>
                      Add another column
                    </StyledTypography>
                  </StyledButton>
                </Stack>
              </Stack>
              <Modal
                open={isColumnModalOpened}
                onClose={() => setisColumnModalOpened(false)}
                disableAutoFocus={true}
              >
                <ColumnModal
                  ref={ref}
                  closeModal={() => setisColumnModalOpened(false)}
                  boardId={openedBoardId}
                />
              </Modal>
              <Modal
                open={isFiltersModalOpened}
                onClose={() => setisFiltersModalOpened(false)}
                disableAutoFocus={true}
              >
                <ColumnModal
                  closeModal={() => setisFiltersModalOpened(false)}
                  boardId={openedBoardId}
                />
              </Modal>
            </CardContent>
          </CardMedia>
        </Card>
      )}
    </>
  );
}
