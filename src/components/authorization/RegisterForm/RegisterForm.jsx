import { useForm } from 'react-hook-form';
import css from './RegisterForm.module.css';
import { NavLink } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import clsx from 'clsx';
import { useState } from 'react';
import sprite from '../../../assets/sprite.svg';
import { useDispatch } from 'react-redux';
import { registered } from '../../../redux/auth/operations';
import Layout from '../../Layout/Layout';
import toast, { Toaster } from 'react-hot-toast';
import { unwrapResult } from '@reduxjs/toolkit';

const schema = yup.object().shape({
  name: yup.string().min(2).max(32),
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

const active = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // const onSubmit = data => console.log(data)

  const onSubmit = async data => {
    try {
      const resultAction = await dispatch(
        registered({
          name: data.name,
          email: data.email,
          password: data.password,
        })
      );
    unwrapResult(resultAction)
    toast.success('Registration successful!');
  } catch (error) {
    toast.error(error.message || 'email in use');
  }
}
    
  return (
    <section className={css.container}>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className={css.links}>
            <NavLink className={active} to="/auth/register">
              Registration
            </NavLink>
            <NavLink className={active} to="/auth/login">
              Log In
            </NavLink>
          </div>
          <div className={css.blockinfo}>
            <input
              placeholder="Enter your name"
              className={css.input}
              type="text"
              {...register('name')}
            />
                        <input placeholder="Enter your email" className={css.input} type="email" {...register('email')} />
                        <ErrorMessage
              name="email"
              errors={errors}
              render={({ message }) => <p className={css.error}>{message}</p>}
            />
                    <div className={css.inputWrapper}>
              <input
                placeholder="Create a password"
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
            Register Now
          </button>
           <Toaster position='top-center' reverseOrder={false} />
        </div>
      </form>
    </section>
  );
}
