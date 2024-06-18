import css from './UserInfoModal.module.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import sprite from '../../../assets/sprite.svg';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import {
  selectUserName,
  selectUserEmail,
  selectUserId,
  selectUserAvatar,
} from '../../../redux/auth/selectors';
import { useDispatch } from 'react-redux';
import {
  updateUserInfo,
  updateUserAvatar,
} from '../../../redux/auth/operations';
import { selectTheme } from '../../../redux/auth/selectors';
// import { setUser } from '../../../redux/auth/authSlice';

const schema = yup.object().shape({
  name: yup.string().min(2).max(32).required(),
  email: yup
    .string()
    .email()
    .matches(/^(?!\@*,)/)
    .required(),
  password: yup.string(),
  // .min(8, 'Password is too short - should be 8 chars minimum.')
  // .max(64, 'Password is too long - should be 64 chars maximum.')
  // .matches(/^(?!.*\s).*$/, 'Password should not contain spaces.')
  // .required(),
});

export default function UserInfo({ close }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);
  const id = useSelector(selectUserId);
  const userAvatar = useSelector(selectUserAvatar);
  const selectedTheme = useSelector(selectTheme);
  const dispatch = useDispatch();

  const [avatarFile, setAvatarFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const data = new FormData();
      data.append('avatar', file);

      dispatch(updateUserAvatar(data));
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = data => {
    // console.log('Submitting data:', data);
    // dispatch(setUser(data));
    const theme = selectedTheme;
    const userData = { ...data, theme };
    dispatch(updateUserInfo({ id, userData }));
    console.log(userData);
    reset();

    close();
  };

  const avatarSrc = avatarFile ? URL.createObjectURL(avatarFile) : userAvatar;

  return (
    <>
      <form
        className={clsx(css.form, css[selectedTheme])}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <svg
            className={clsx(css.logo_icon, css[selectedTheme])}
            width="18"
            height="18"
            onClick={close}
          >
            <use xlinkHref={`${sprite}#icon-x-close`}></use>
          </svg>
          <p className={clsx(css.title, css[selectedTheme])}>Edit profile</p>
          <div className={clsx(css.avatar, css[selectedTheme])}>
            <img
              src={avatarSrc}
              className={clsx(css.user_avatar, css[selectedTheme])}
              alt=""
            />

            <div
              className={clsx(css.icon, css[selectedTheme])}
              onClick={handleAvatarClick}
            >
              <svg
                className={clsx(css.plus_icon, css[selectedTheme])}
                width="10"
                height="10"
              >
                <use xlinkHref={`${sprite}#icon-plus`}></use>
              </svg>
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <div className={css.blockinfo}>
            <input
              placeholder="Enter your name"
              className={clsx(css.input, css[selectedTheme])}
              type="name"
              defaultValue={userName}
              {...register('name')}
            />
            <ErrorMessage
              name="name"
              errors={errors}
              render={({ message }) => <p className={css.error}>{message}</p>}
            />

            <input
              placeholder="Enter your email"
              className={clsx(css.input, css[selectedTheme])}
              type="email"
              defaultValue={userEmail}
              {...register('email')}
            />
            <ErrorMessage
              name="email"
              errors={errors}
              render={({ message }) => <p className={css.error}>{message}</p>}
            />

            <div className={css.inputWrapper}>
              <input
                placeholder="Please, enter your old password or new password"
                className={clsx(css.input, css[selectedTheme])}
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
              />
              <svg
                className={clsx(css.plus_icon_1, css[selectedTheme])}
                width="16.5"
                height="12"
                onClick={handleClickShowPassword}
              >
                <use xlinkHref={`${sprite}#icon-eye`}></use>
              </svg>
            </div>
            <ErrorMessage
              name="password"
              errors={errors}
              render={({ message }) => <p className={css.error}>{message}</p>}
            />
          </div>
          <button className={clsx(css.btn, css[selectedTheme])} type="submit">
            Send
          </button>
        </div>
      </form>
    </>
  );
}
