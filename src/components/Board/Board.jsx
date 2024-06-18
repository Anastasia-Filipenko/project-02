import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  selectCurrentBoard,
  selectBoardIsLoading,
} from '../../redux/boards/selectors';
import {
  selectColumnIsLoading,
  selectAllColumns,
} from '../../redux/columns/selectors';
import { fetchCurrentBoard } from '../../redux/boards/operations';
import { useTheme } from '@mui/material/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Stack,
  CardMedia,
  Modal,
  Typography,
  IconButton,
} from '@mui/material';
import { Column } from '../Column/Column';
import { generateBgUrl } from './utils';

import { selectCurrentScreen } from '../../redux/common/selectors';
import { ColumnModal } from '../ColumnModal/ColumnModal';
import Loader from '../Loader/Loader';

import sprite from '../../assets/sprite.svg';
import {
  StyledButton,
  StyledSvgIcon,
  StyledTypography,
} from '../MUIstyled/styledComponent';
import { StyledPlusIconColumn } from '../MUIstyled/commonComponent';
import FilterModal from '../FilterModal/FilterModal';

export default function Board() {
  const dispatch = useDispatch();
  const { boardTitle } = useParams();
  const board = useSelector(selectCurrentBoard);
  const columns = useSelector(state => selectAllColumns(state, board._id));
  const currentScreen = useSelector(selectCurrentScreen);
  const [imgUrl, setImgUrl] = useState(null);
  const [openedBoardId, setOpenedBoardId] = useState();
  const [isColumnModalOpened, setisColumnModalOpened] = useState(false);
  const [isFiltersModalOpened, setisFiltersModalOpened] = useState(false);
  const theme = useTheme();
  const isBoardLoading = useSelector(selectBoardIsLoading);
  const isColumnLoading = useSelector(selectColumnIsLoading);
  const ref = useRef();

  useEffect(() => {
    if (board) {
      if (board.title === boardTitle && board._id) {
        setImgUrl(generateBgUrl(board.background, currentScreen));
        setOpenedBoardId(`${board._id}.${boardTitle}`);
      }
    }
  }, [board, boardTitle, currentScreen]);

  useEffect(() => {
    if (openedBoardId) {
      dispatch(fetchCurrentBoard(openedBoardId.split('.')[0]));
    }
  }, [dispatch, openedBoardId]);

  const mediaSx = {
    height: '100%',
    backgroundColor: `${theme.color.defaultBoardBackground}`,
  };

  return (
    <>
      {(isBoardLoading || isColumnLoading) && <Loader />}
      {!isBoardLoading && !isColumnLoading && board && board.background && (
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
                fontSize: '18px',
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
                    width: '12px',
                  },
                  '&::-webkit-scrollbar-track': {
                    boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
                    borderRadius: '12px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: theme.color.defaultBoardBackground,
                    outline: `1px solid slategrey`,
                    borderRadius: '12px',
                  },
                },
              }}
            >
              <Stack
                direction="row"
                gap="32px"
                sx={{ height: 'calc(100vh - 200px)' }}
              >
                {columns?.map((column, index) => (
                  <Column
                    key={index}
                    columnId={column._id}
                    boardId={board._id}
                  />
                ))}
                <Stack>
                  <StyledButton
                    onClick={() => setisColumnModalOpened(true)}
                    sx={{
                      backgroundColor: theme.color.btnColumnBackround,
                      textTransform: 'none',
                      padding: '10px',
                      width: '334px',
                      height: '56px',
                      '&.MuiButtonBase-root': {
                        '&:hover': {
                          backgroundColor: theme.color.btnColumnBackround,
                        },
                      },
                    }}
                    fullWidth
                    startIcon={<StyledPlusIconColumn />}
                  >
                    <StyledTypography sx={{ fontSize: '14px' }}>
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
                  boardId={board._id}
                />
              </Modal>
              {/* <Modal
                onClose={() => setisFiltersModalOpened(false)}
                disableAutoFocus={true}
              > */}

              {/* </Modal> */}
            </CardContent>
          </CardMedia>
        </Card>
      )}
      <FilterModal
        isOpen={isFiltersModalOpened}
        onClose={() => setisFiltersModalOpened(false)}
        boardId={openedBoardId}
      />
    </>
  );
}
