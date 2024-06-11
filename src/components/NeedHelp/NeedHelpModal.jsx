import css from './NeedHelpModal.module.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import sprite from '../../assets/sprite.svg';
import { sendComment } from '../../redux/needHelp/slice';
import { useDispatch } from 'react-redux';

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .matches(/^(?!\@*,)/)
    .required(),
  comment: yup.string().min(20).max(200).required(),
});

export default function NeedHelpModal({ close }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const onSubmit = data => {
    console.log(data);
    dispatch(
      sendComment({
        email: data.email,
        comment: data.comment,
      })
    );
    reset();
  };

  return (
    <>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <svg className={css.logo_icon} width="18" height="18" onClick={close}>
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
              className={css.textarea_comment}
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
    </>
  );
}
