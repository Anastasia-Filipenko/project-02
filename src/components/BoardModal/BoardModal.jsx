import sprite from '../../assets/sprite.svg';
import * as Yup from 'yup';
import {
  FormControl,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { forwardRef, useEffect, useRef } from 'react';
import { icons } from './iconsList';
import { CloudinaryImages } from '../CloudinaryImages/CloudinaryImages';
import { addBoard, editBoard } from '../../redux/boards/operations';
import { useTheme } from '@mui/material/styles';
import {
  StyledSvgIcon,
  StyledTextField,
  StyledTypography,
} from '../MUIstyled/styledComponent';
import { selectBackgrounds } from '../../redux/boards/selectors';
import { StyleBoxModal, StyledCardModal } from '../MUIstyled/styledComponent';
import { StyledSubmitButtonWithPlusicon } from '../MUIstyled/commonComponent';

export const BoardModal = forwardRef(function BoardModal(props, ref) {
  const dispatch = useDispatch();
  const backgrounds = useSelector(selectBackgrounds);
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
      title: props.title ?? '',
      icon: props.selectedIcon ?? icons[0],
      background: props.selectedBackground ?? theme.name,
    },
    validationSchema: schema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: values => {
      const boardData = {
        ...values,
        background: values.background.split('/').pop(),
      };
      props.editMode
        ? dispatch(editBoard({ boardId: props.boardId, body: boardData }))
        : dispatch(addBoard(boardData));
      props.closeModal();
    },
  });

  const handleIconChange = (_, icon) => {
    formik.setFieldValue('icon', icon);
  };

  const handleBgChange = (_, background) => {
    formik.setFieldValue('background', background);
  };

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
          title={props.editMode ? 'Edit board' : 'New board'}
        />
        <CardContent>
          <form onSubmit={formik.handleSubmit} id="board-form" ref={ref}>
            <FormControl sx={{ display: 'flex' }}>
              <StyledTextField
                name="title"
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
                  <StyledSvgIcon>
                    <use xlinkHref={`${sprite}#icon-pyramid`}></use>
                  </StyledSvgIcon>
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
              <StyledSubmitButtonWithPlusicon>
                <StyledTypography>
                  {props.editMode ? 'Edit' : 'Create'}
                </StyledTypography>
              </StyledSubmitButtonWithPlusicon>
            </FormControl>
          </form>
        </CardContent>
      </StyledCardModal>
    </StyleBoxModal>
  );
});
