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
} from '@mui/material';
import { Column } from '../Column/Column';
import { cld } from '../CloudinaryImages/cloudinaryClient';
import { selectCurrentScreen } from '../../redux/common/selectors';
import { ColumnModal } from '../ColumnModal/ColumnModal';
import Loader from '../Loader/Loader';

import sprite from '../../assets/sprite.svg';

const generateBgUrl = (selectedBg, screen) => {
  let folderName;
  switch (screen) {
    case 'desktop':
      folderName = 'bg/desktop';
      break;
    case 'desktop2x':
      folderName = 'bg/desktop2x';
      break;
    case 'tablet':
      folderName = 'bg/tablet';
      break;
    case 'tablet2x':
      folderName = 'bg/tablet2x';
      break;
    case 'mobile':
      folderName = 'bg/mobile';
      break;
    case 'mobile2x':
      folderName = 'bg/mobile2x';
      break;
    default:
      folderName = 'bg/desktop';
  }
  return cld.image(`${folderName}/${selectedBg}`).toURL();
};

export default function Board() {
  const dispatch = useDispatch();
  const { boardTitle } = useParams();
  const board = useSelector(selectCurrentBoard);
  const currentScreen = useSelector(selectCurrentScreen);
  const [imgUrl, setImgUrl] = useState(null);
  const [openedBoardId, setOpenedBoardId] = useState();

  const [isColumnModalOpened, setisColumnModalOpened] = useState(false);
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
            />
            <CardContent
              sx={{
                overflowX: 'auto',
                flexWrap: 'nowrap',
                maxWidth: {
                  // xs: '360px',
                  // md: '768px',
                  // lg: '1340px'
                },
                '&.MuiCardContent-root': {
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
            >
              <Stack direction="row" gap={2}>
                {board.columns?.map((column, index) => (
                  <Column
                    key={index}
                    columnId={column._id}
                    boardId={openedBoardId}
                  />
                ))}
                <Stack>
                  <Button
                    onClick={() => setisColumnModalOpened(true)}
                    variant="contained"
                    sx={{
                      backgroundColor: '#bedbb0',
                      textTransform: 'none',
                      padding: '10px',
                      width: '334px',
                      height: '56px',
                      display: 'flex',
                    }}
                    fullWidth
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
                        <svg
                          fill="white"
                          stroke="white"
                          width="14px"
                          height="14px"
                        >
                          <use xlinkHref={`${sprite}#icon-plus`}></use>
                        </svg>
                      </Box>
                    }
                  >
                    <Typography color={theme.color.themeColor}>
                      Add another column
                    </Typography>
                  </Button>
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
            </CardContent>
          </CardMedia>
        </Card>
      )}
    </>
  );
}
