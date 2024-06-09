import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { selectCurrentBoard } from '../../redux/boards/selectors';
import { fetchCurrentBoard } from '../../redux/boards/operations';
import {
  Card,
  CardHeader,
  CardContent,
  Stack,
  Grid,
  CardMedia,
} from '@mui/material';
import { Column } from '../Column/Column';
import { cld } from '../CloudinaryImages/cloudinaryClient';
import { selectCurrentScreen } from '../../redux/common/selectors';

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

export const Board = () => {
  const dispatch = useDispatch();
  const { boardTitle } = useParams();
  const board = useSelector(selectCurrentBoard);
  const currentScreen = useSelector(selectCurrentScreen);
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    if (board) {
      dispatch(fetchCurrentBoard(board._id));
      if (board.title === boardTitle && board._id) {
        setImgUrl(generateBgUrl(board.background, currentScreen));
      }
    }
  }, [dispatch, board, boardTitle, currentScreen]);

  return (
    <>
      {board && board.background && (
        <Card
          sx={{
            height: '100%',
          }}
        >
          <CardMedia image={imgUrl} sx={{ height: '100%' }}>
            <CardHeader title={board.title} />
            <CardContent>
              <Stack direction="row" spacing={3}>
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  {board.columns?.map((column, index) => (
                    <Column key={index} columnName={column.name} />
                  ))}
                </Grid>
              </Stack>
            </CardContent>
          </CardMedia>
        </Card>
      )}
    </>
  );
};
