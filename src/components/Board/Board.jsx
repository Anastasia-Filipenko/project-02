import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { selectCurrentBoard } from '../../redux/boards/selectors';
import { fetchCurrentBoard } from '../../redux/boards/operations';
import { Card, CardHeader, CardContent, Stack, Grid } from '@mui/material';
import { Column } from '../Column/Column';

export const Board = () => {
  const dispatch = useDispatch();
  const { boardTitle } = useParams();
  const board = useSelector(selectCurrentBoard);
    
  useEffect(() => {
    dispatch(fetchCurrentBoard(boardTitle));
  }, [dispatch, boardTitle]);

  return (
    <Card sx={{ backgroundColor: 'grey', height: '100%' }}>
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
    </Card>
  );
};
