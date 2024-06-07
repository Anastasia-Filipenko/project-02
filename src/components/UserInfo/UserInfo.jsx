import css from './UserInfo.module.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import sprite from '../../assets/sprite.svg';
import userAvatar from '../../images/userAvatar.jpg';
import { useState } from 'react';

const schema = yup.object().shape({
  name: yup.string().min(2).max(32).required(),
  email: yup
    .string()
    .email()
    .matches(/^(?!\@*,)/)
    .required(),
  password: yup
    .string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .max(64, 'Password is too long - should be 64 chars maximum.')
    .matches(/^(?!.*\s).*$/, 'Password should not contain spaces.')
    .required(),
});

export default function UserInfo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  //приховування паролю
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = data => {
    console.log(data);
    reset();
  };

  return (
    <section className={css.container}>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <svg
            className={css.logo_icon}
            width="18"
            height="18"
            onClick={() => {
              console.log('close modal');
            }}
          >
            <use xlinkHref={`${sprite}#icon-x-close`}></use>
          </svg>
          <p className={css.title}>Edit profile</p>
          <div className={css.avatar}>
            <img src={userAvatar} className={css.user_avatar} alt="" />
            <div className={css.icon}>
              <svg
                className={css.plus_icon}
                width="10"
                height="10"
                onClick={() => {
                  console.log('choose avatar');
                }}
              >
                <use xlinkHref={`${sprite}#icon-plus`}></use>
              </svg>
            </div>
          </div>
          <div className={css.blockinfo}>
            <input
              placeholder="name from db"
              className={css.input}
              type="text"
              //   value={}
              {...register('name')}
            />
            <ErrorMessage
              name="name"
              errors={errors}
              render={({ message }) => <p className={css.error}>{message}</p>}
            />

            <input
              placeholder="email from db"
              className={css.input}
              type="email"
              //   value={}
              {...register('email')}
            />
            <ErrorMessage
              name="email"
              errors={errors}
              render={({ message }) => <p className={css.error}>{message}</p>}
            />
            {/* приховування паролю, тільки svg треба буде змінити*/}
            <div className={css.inputWrapper}>
              <input
                placeholder="password from db"
                className={css.input}
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
              />
              <svg
                className={css.plus_icon_1}
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
          <button className={css.btn} type="submit">
            Send
          </button>
        </div>
      </form>
    </section>
  );
}
