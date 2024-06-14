import sprite from '../../assets/sprite.svg';
import * as Yup from 'yup';
import {
  FormControl,
  TextField,
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  IconButton,
} from '@mui/material';

import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { forwardRef, useEffect, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { addColumn, editColumn } from '../../redux/columns/operations';

export const ColumnModal = forwardRef(function ColumnModal(props, ref) {
  const dispatch = useDispatch();
  const titleInputRef = useRef(null);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    disableAutoFocus: true,
  };

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  const schema = Yup.object().shape({
    title: Yup.string().required(
      <Box component="span" color="error">
        Required
      </Box>
    ),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: props.title ?? '',
    },
    validationSchema: schema,
    onSubmit: values => {
      dispatch(
        props.editColumn
          ? editColumn({
              boardId: props.boardId,
              columnTitle: values.title,
              columnId: props.columnId,
            })
          : addColumn({ boardId: props.boardId, columnTitle: values.title })
      );
      props.closeModal();
    },
  });

  return (
    <Box sx={modalStyle}>
      <Card
        sx={{
          maxWidth: 350,
          heigth: 433,
          bgcolor: 'white',
          border: '0px solid #000',
          borderRadius: '8px',
        }}
      >
        <CardHeader
          action={
            <IconButton onClick={props.closeModal}>
              <CloseIcon />
            </IconButton>
          }
          title={props.editColumn ? "Edit column" : "Add column"} 
        />
        <CardContent>
          <form onSubmit={formik.handleSubmit} id="column-form" ref={ref}>
            <FormControl>
              <TextField
                name="title"
                variant="outlined"
                size="medium"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                inputRef={titleInputRef}
              ></TextField>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#bedbb0',
                  textTransform: 'none',
                }}
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
                    <svg fill="white" stroke="white" width="14px" height="14px">
                      <use xlinkHref={`${sprite}#icon-plus`}></use>
                    </svg>
                  </Box>
                }
              >
                {props.editColumn ? 'Edit' : 'Add'}
              </Button>
            </FormControl>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
});
