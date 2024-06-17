import { useForm } from 'react-hook-form';
import ReactModal from 'react-modal';
import { useState } from 'react';
// import sprite from '../../../assets/sprite.svg';
// import sprite from '../../assets/sprite.svg';
import sprite from '../../../../assets/sprite.svg';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// import { selectTheme } from '../../../redux/theme/selectors';
// import { selectTheme } from '../../redux/theme/selectors.js';
import { selectTheme } from '../../../../redux/theme/selectors.js';
// import css from './CreateCardModalWindow.module.css';
import css from './EditCardModalWindow.module.css';
import clsx from 'clsx';

// import { createCard } from '../../redux/task/operations.js';
import { createCard } from '../../../../redux/task/operations.js';

const schema = yup.object().shape({
  title: yup.string().min(2).required(),
  description: yup.string().min(2).required(),
});

export default function EditCardModalWindow({
  isOpen,
  handleModalClose,
  cardInfo,
}) {
  console.log("cardInfoInModal: ", cardInfo);
  const [priority, setPiority] = useState(cardInfo.priority);
  const [titleValue, setTitleChanges] = useState(cardInfo.title);
  const [descriptionValue, setDescriptionChanges] = useState(cardInfo.title);
  const [startDate, setStartDate] = useState(new Date(cardInfo.deadline));
  // console.log("startDate: ", startDate);
  // console.log("cardDeadline: ", new Date(cardInfo.deadline));
  const [isDatePickerOpen, setDatePickerIsOpen] = useState(false);
  const selectedTheme = useSelector(selectTheme);
  console.log(selectedTheme);
  const handleTitleChange = (event) => {
    setTitleChanges(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescriptionChanges(event.target.value);
  };
  const handleChange = e => {
    setDatePickerIsOpen(!isDatePickerOpen);
    setStartDate(e);
  };
  const handleClick = e => {
    e.preventDefault();
    setDatePickerIsOpen(!isDatePickerOpen);
  };
  const dispatch = useDispatch();

  const newDate = new Date();

  const onPriorityChange = event => {
    setPiority(event.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    dispatch(
      // createCard({
      //   title: data.title,
      //   description: data.description,
      //   priority,
      //   columnId,
      //   deadline: startDate,
      // })
    );
    handleModalClose();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      className={clsx(css.modalWindowWrp, css[selectedTheme])}
      overlayClassName={css.modalOverlay}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      onRequestClose={handleModalClose}
      ariaHideApp={false}
    >
      <form className={clsx(css.modalWindow, css[selectedTheme])} onSubmit={handleSubmit(onSubmit)}>
        <button className={clsx(css.modalWindowCloseBtn, css[selectedTheme])} onClick={handleModalClose}>
          <svg width="18" height="18" aria-label="close-btn">
            <use href={`${sprite}#icon-x-close`}></use>
          </svg>
        </button>
        <p className={clsx(css.modalWindowHeader, css[selectedTheme])}>Edit card</p>
        <input
          className={clsx(css.taskTitleInput, css[selectedTheme])}
          {...register('title')}
          name="title"
          placeholder="Title"
          value={titleValue} 
          onChange={handleTitleChange}
        />
        <ErrorMessage 
          name="title" 
          errors={errors} 
          render={({message}) => <p className={css.error}>{message}</p>}
        />
        <textarea
          className={clsx(css.taskDescriptionInput, css[selectedTheme])}
          {...register('description')}
          name="description"
          placeholder="Description"
          value={descriptionValue}
          onChange={handleDescriptionChange}
        />
        <ErrorMessage 
          name="description" 
          errors={errors}
          render={({message}) => <p className={css.error}>{message}</p>} 
        />
        <p className={clsx(css.taskPriorityHeader, css[selectedTheme])}>Label color</p>
        <div className={css.taskPriorityInputsWrp}>
          <div className={css.prorityWrp}>
            <input
              className={css.radioInput}
              type="radio"
              name="priority"
              value="Low"
              id="low"
              onChange={onPriorityChange}
              checked={priority === "Low"}
            />
            <div className={`${css.styledRadio} ${css.lowPriorityColor}`}></div>
          </div>
          <div className={css.prorityWrp}>
            <input
              className={css.radioInput}
              type="radio"
              name="priority"
              value="Medium"
              id="medium"
              onChange={onPriorityChange}
              checked={priority === "Medium"}
            />
            <div
              className={`${css.styledRadio} ${css.mediumPriorityColor}`}
            ></div>
          </div>
          <div className={css.prorityWrp}>
            <input
              className={css.radioInput}
              type="radio"
              name="priority"
              value="High"
              id="high"
              onChange={onPriorityChange}
              checked={priority === "High"}
            />
            <div
              className={`${css.styledRadio} ${css.highPriorityColor}`}
            ></div>
          </div>
          <div className={css.prorityWrp}>
            <input
              className={css.radioInput}
              type="radio"
              name="priority"
              value="Without priority"
              id="without"
              onChange={onPriorityChange}
              checked={priority === "Without priority"}
            />
            <div
              className={clsx(css.styledRadio, css.withoutPriorityColor, css[selectedTheme])}
            ></div>
          </div>
        </div>
        <p className={clsx(css.deadlineHeader, css[selectedTheme])}>Deadline</p>
        <button className={clsx(css.pickerBtn, css[selectedTheme])} onClick={handleClick}>
          {startDate.toDateString() == newDate.toDateString() ? (
            <p>Today, </p>
          ) : null}
          {format(startDate, 'dd/MM/yyyy')}
          <svg className={clsx(css.pickerSvg, css[selectedTheme])} width="18" height="18" aria-label="close-btn">
            <use href={`${sprite}#icon-down`}></use>
          </svg>
        </button>
        {isDatePickerOpen && (
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={startDate}
            onChange={handleChange}
            inline
            minDate={new Date()}
          />
        )}
        <button className={clsx(css.submitBtn, css[selectedTheme])} type="submit">
          <span className={clsx(css.submitBtnSpan, css[selectedTheme])}>
            <svg className={clsx(css.submitBtnSvg, css[selectedTheme])} stroke="white" width="14" height="14" aria-label="close-btn">
              <use href={`${sprite}#icon-plus`}></use>
            </svg>
          </span>
          <p className={clsx(css.submitBtnText, css[selectedTheme])}>Edit</p>
        </button>
      </form>
    </ReactModal>
  );
}
