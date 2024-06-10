import sprite from '../../assets/sprite.svg';
import * as Yup from 'yup';
import {
  FormControl,
  TextField,
  Box,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';

import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { forwardRef, useEffect, useState, useRef } from 'react';
import { icons } from './iconsList';
import { CloudinaryImages } from '../CloudinaryImages/CloudinaryImages';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { addBoard } from '../../redux/boards/operations';

export const BoardModal = forwardRef(function BoardModal(props, ref) {
  const dispatch = useDispatch();
  const [backrounds, setBackrounds] = useState(null);
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
    (async () => {
      const list = await axios.get(
        'https://res.cloudinary.com/duchyrp8f/image/list/bg.json'
      );
      setBackrounds([...list.data.resources]);
    })();
  }, []);

  const schema = Yup.object().shape({
    title: Yup.string().required(
      <Box component="span" color="error">
        Required
      </Box>
    ),
    icon: Yup.string().required(
      <Box component="span" color="error">
        Required
      </Box>
    ),
    background: Yup.string().required(
      <Box component="span" color="error">
        Required
      </Box>
    ),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: '',
      icon: '',
      background: '',
    },
    validationSchema: schema,
    onSubmit: values => {
      dispatch(
        addBoard({ ...values, background: values.background.split('/').pop() })
      );
      props.closeModal();
    },
  });

  const handleIconChange = (event, icon) => {
    formik.setFieldValue('icon', icon);
  };

  const handleBgChange = (event, background) => {
    formik.setFieldValue('background', background);
  };

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
          title="New Board"
        />
        <CardContent sx={{ display: 'flex' }}>
          <form onSubmit={formik.handleSubmit} id="board-form" ref={ref}>
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
              <Typography>Icons</Typography>
              <ToggleButtonGroup
                id="icon"
                value={formik.values.icon}
                onChange={handleIconChange}
                exclusive={true}
                name="icon"
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  '&.Mui-selected': {
                    border: '5px solid',
                  },
                  width: '100%',
                }}
              >
                {icons.map(icon => (
                  <ToggleButton key={icon} value={icon} name="click" ref={ref}>
                    <svg
                      width="20"
                      height="20"
                      stroke={formik.values.icon === `${icon}` ? 'red' : 'grey'}
                      fillOpacity="0.0"
                    >
                      <use xlinkHref={`${sprite}#${icon}`}></use>
                    </svg>
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>

              <Typography>Backgrounds</Typography>
              <ToggleButtonGroup
                value={formik.values.background}
                onChange={handleBgChange}
                exclusive={true}
                id="background"
                sx={{
                  gap: 2,
                  '&.Mui-selected': {
                    border: '5px solid',
                  },
                  width: '100%',
                  mb: 2,
                  flexWrap: 'wrap',
                }}
              >
                {backrounds &&
                  backrounds.map(bg => (
                    <ToggleButton
                      key={bg.version}
                      value={bg.public_id}
                      name="click"
                      ref={ref}
                      sx={{
                        p: 0,
                        borderRadius: '6px',
                        borderColor:
                          formik.values.background === `${bg.public_id}`
                            ? 'red'
                            : 'black',
                      }}
                    >
                      <CloudinaryImages
                        path={bg.public_id}
                        size={{ width: 25, height: 25 }}
                      />
                    </ToggleButton>
                  ))}
              </ToggleButtonGroup>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#bedbb0',
                  textTransform: 'none'
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
                Create
              </Button>
            </FormControl>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
});
