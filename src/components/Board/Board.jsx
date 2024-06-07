import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { selectCurrentBoard } from '../../redux/currentBoard/selectors';
import { fetchCurrentBoard } from '../../redux/currentBoard/operations';
import { Card, CardHeader, CardContent, Stack } from '@mui/material';
import { Column } from '../Column/Column';

export const Board = () => {
  const dispatch = useDispatch();
  const { boardName } = useParams();

  const board = useSelector(selectCurrentBoard);

  useEffect(() => {
    dispatch(fetchCurrentBoard(boardName));
  }, [dispatch, boardName]);

  return (
    <Card sx={{ backgroundColor: 'grey', height: '100%' }}>
      <CardHeader title={board.name} />

      <CardContent>
        <Stack direction="row" spacing={3}>
          {board.columns?.map((column, index) => (
            <Column key={index} columnName={column.name} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};
