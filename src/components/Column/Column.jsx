import { Card, CardHeader, IconButton, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

export const Column = props => {
  return (
    <Grid container alignItems="left">
      <Grid item>
        <Card>
          <CardHeader
            title={props.columnName}
            action={
              <IconButton>
                <EditIcon />
              </IconButton>
            }
          ></CardHeader>
        </Card>
        <Card>
          <CardHeader
            title="Add card"
            action={
              <IconButton>
                <AddIcon />
              </IconButton>
            }
          ></CardHeader>
        </Card>
      </Grid>
    </Grid>
  );
};
