import css from './NeedHelp.module.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import sprite from '../../assets/sprite.svg';

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .matches(/^(?!\@*,)/)
    .required(),
  comment: yup.string().min(20).max(200).required(),
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
          <p className={css.title}>Need help</p>
          <div className={css.blockinfo}>
            <input
              placeholder="Email address"
              className={css.input_email}
              type="email"
              {...register('email')}
            />
            <ErrorMessage
              name="email"
              errors={errors}
              render={({ message }) => <p className={css.error}>{message}</p>}
            />

            <textarea
              placeholder="Comment"
              type="comment"
              className={css.input_password}
              rows={4}
              {...register('comment')}
            />
            <ErrorMessage
              name="comment"
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
