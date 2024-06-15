import sprite from '../../../assets/sprite.svg';
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
import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { forwardRef, useEffect, useRef } from 'react';
import { icons } from '../../BoardModal/iconsList';
import { CloudinaryImages } from '../../CloudinaryImages/CloudinaryImages';
import CloseIcon from '@mui/icons-material/Close';
import { updateBoardById } from '../../../redux/boards/operations';
import { useTheme, styled } from '@mui/material/styles';
import { selectBackgrounds } from '../../../redux/boards/selectors';

const UpdateBoard = forwardRef(function UpdateBoard(props, ref) {
  const dispatch = useDispatch();
  const backgrounds = useSelector(selectBackgrounds);
  const titleInputRef = useRef(null);
  const theme = useTheme();

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    disableAutoFocus: true,
    padding: '24px',
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
    icon: Yup.string().required(
      <Box component="span" color="error">
        Icon required
      </Box>
    ),
    background: Yup.string().required(
      <Box component="span" color="error">
        Background required
      </Box>
    ),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: '',
      icon: props.selectedIcon ?? icons[0],
      background: props.selectedBackground ?? theme.name,
    },
    validationSchema: schema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: values => {
      dispatch(
        updateBoardById({ ...values, background: values.background.split('/').pop() })
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

  const StyledTextField = styled(TextField)({
    '& .MuiInputBase-root': {
      color: `${theme.color.fontColor}`,
    },
    '& .MuiInputBase-root.MuiOutlinedInput-root': {
      '&.Mui-focused': {
        '.MuiOutlinedInput-notchedOutline': {
          borderColor: `${theme.color.inputColorDefault}`,
        },
      },
      '&:hover': {
        '.MuiOutlinedInput-notchedOutline': {
          borderColor: `${theme.color.inputColorActive}`,
        },
      },
    },
    paddingBottom: '24px',
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
          backgroundColor: `${theme.color.themeColor}`,
        }}
      >
        <CardHeader
          action={
            <IconButton onClick={props.closeModal}>
              <CloseIcon sx={{ color: `${theme.color.fontColor}` }} />
            </IconButton>
          }
          titleTypographyProps={{ color: `${theme.color.fontColor}` }}
          title="Edit board"
        />
        <CardContent sx={{ display: 'flex' }}>
          <form onSubmit={formik.handleSubmit} id="board-form" ref={ref}>
            <FormControl>
              <StyledTextField
                autoFocus
                fullWidth
                name="title"
                variant="outlined"
                size="medium"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                inputRef={titleInputRef}
                placeholder="Title"
              />
              <Typography color={theme.color.fontColor} pb="14px">
                Icon
              </Typography>
              <ToggleButtonGroup
                id="icon"
                value={formik.values.icon}
                onChange={handleIconChange}
                exclusive={true}
                name="icon"
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  width: '100%',
                  paddingBottom: '24px',
                }}
              >
                {icons.map(icon => (
                  <ToggleButton
                    key={icon}
                    value={icon}
                    name="click"
                    ref={ref}
                    sx={{ padding: '0', border: 'none' }}
                  >
                    <svg
                      width="18"
                      height="18"
                      stroke={
                        formik.values.icon === `${icon}`
                          ? `${theme.color.fontColor}`
                          : 'grey'
                      }
                      fillOpacity="0.0"
                    >
                      <use xlinkHref={`${sprite}#${icon}`}></use>
                    </svg>
                  </ToggleButton>
                ))}
                {formik.errors && formik.errors.icon && (
                  <Typography color="error" variant="caption" ml="14px">
                    {formik.errors.icon}
                  </Typography>
                )}
              </ToggleButtonGroup>

              <Typography color={theme.color.fontColor} pb="14px">
                Background
              </Typography>
              <ToggleButtonGroup
                value={formik.values.background}
                onChange={handleBgChange}
                exclusive={true}
                id="background"
                sx={{
                  gap: '4px',
                  width: '100%',
                  mb: 2,
                  flexWrap: 'wrap',
                  paddingRight: '50px',
                  marginBottom: '40px',
                }}
              >
                <ToggleButton
                  key="0"
                  value={theme.name}
                  type="button"
                  name="click"
                  sx={{
                    borderRadius: '6px',
                    borderTopRightRadius: '6px',
                    // backgroundColor: `${theme.color.themeColor}`,
                    backgroundColor: 'white',
                    p: 0,
                    border: 'none',
                    width: '28px',
                    height: '28px',
                    '&.MuiToggleButton-root': {
                      '&.MuiToggleButtonGroup-firstButton': {
                        borderRadius: '6px',
                        backgroundColor: `${theme.color.defaultBoardBackground}`,
                        '&.Mui-selected': {
                          transform: 'scale(1.15)',
                        },
                        '&:hover': {
                          transform: 'scale(1.15)',
                          backgroundColor: `${theme.color.defaultBoardBackground}`,
                        },
                      },
                    },
                  }}
                >
                  <LandscapeOutlinedIcon />
                </ToggleButton>
                {backgrounds &&
                  backgrounds.map(bg => (
                    <ToggleButton
                      key={bg.version}
                      value={bg.public_id}
                      name="click"
                      ref={ref}
                      sx={{
                        p: 0,
                        border: 'none',
                        '&.MuiToggleButtonGroup-grouped': {
                          '&.Mui-selected': {
                            transform: 'scale(1.15)',
                          },
                          '&:hover': {
                            transform: 'scale(1.15)',
                          },
                        },
                        borderColor:
                          formik.values.background === `${bg.public_id}`
                            ? 'red'
                            : 'black',
                      }}
                    >
                      <CloudinaryImages
                        path={bg.public_id}
                        size={{ width: 28, height: 28 }}
                      />
                    </ToggleButton>
                  ))}
                {formik.errors && formik.errors.background && (
                  <Typography color="error" variant="caption" ml="14px">
                    {formik.errors.background}
                  </Typography>
                )}
              </ToggleButtonGroup>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#bedbb0',
                  textTransform: 'none',
                  paddingY: '10px',
                }}
              >
                <Typography color={theme.color.themeColor}>Edit</Typography>
              </Button>
            </FormControl>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
});

export default UpdateBoard;
