import css from './NeedHelpModal.module.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import sprite from '../../assets/sprite.svg';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { selectTheme } from '../../redux/theme/selectors';
import { sendEmail } from '../../redux/needHelp/operations';

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

  const selectedTheme = useSelector(selectTheme);
  const dispatch = useDispatch();

  const onSubmit = data => {
    dispatch(
      sendEmail({
        userEmail: data.email,
        comment: data.comment,
      })
    );
    reset();
  };

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
          <p className={clsx(css.title, css[selectedTheme])}>Need help</p>
          <div className={css.blockinfo}>
            <input
              placeholder="Email address"
              className={clsx(css.input_email, css[selectedTheme])}
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
              className={clsx(css.textarea_comment, css[selectedTheme])}
              rows={4}
              {...register('comment')}
            />
            <ErrorMessage
              name="comment"
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
