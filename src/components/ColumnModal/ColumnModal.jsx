import sprite from '../../assets/sprite.svg';
import * as Yup from 'yup';
import {
  FormControl,
  Box,
  CardHeader,
  CardContent,
  IconButton,
} from '@mui/material';

import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { forwardRef, useEffect, useRef } from 'react';
import { addColumn, editColumn } from '../../redux/columns/operations';
import {
  StyleBoxModal,
  StyledCardModal,
  StyledSvgIcon,
  StyledTextField,
  StyledTypography,
} from '../MUIstyled/styledComponent';
import { StyledSubmitButtonWithPlusicon } from '../MUIstyled/commonComponent';
import { useTheme } from '@mui/material/styles';

export const ColumnModal = forwardRef(function ColumnModal(props, ref) {
  const dispatch = useDispatch();
  const titleInputRef = useRef(null);
  const theme = useTheme();

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
    <StyleBoxModal>
      <StyledCardModal>
        <CardHeader
          action={
            <IconButton onClick={props.closeModal}>
              <StyledSvgIcon>
                <use xlinkHref={`${sprite}#icon-x-close`}></use>
              </StyledSvgIcon>
            </IconButton>
          }
          titleTypographyProps={{ color: `${theme.color.fontColor}` }}
          title={props.editColumn ? 'Edit column' : 'Add column'}
        />
        <CardContent>
          <form onSubmit={formik.handleSubmit} id="column-form" ref={ref}>
            <FormControl sx={{ display: 'flex' }}>
              <StyledTextField
                name="title"
                size="medium"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                inputRef={titleInputRef}
              ></StyledTextField>
              <StyledSubmitButtonWithPlusicon>
                <StyledTypography>
                  {props.editColumn ? 'Edit' : 'Add'}
                </StyledTypography>
              </StyledSubmitButtonWithPlusicon>
            </FormControl>
          </form>
        </CardContent>
      </StyledCardModal>
    </StyleBoxModal>
  );
});
