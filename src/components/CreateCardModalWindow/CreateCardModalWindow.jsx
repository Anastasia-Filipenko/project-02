import { useForm } from 'react-hook-form';
import ReactModal from 'react-modal';
import { useState } from 'react';
// import sprite from '../../../assets/sprite.svg';
import sprite from '../../assets/sprite.svg';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
// import { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from 'react-redux';
import css from './CreateCardModalWindow.module.css';

import { createCard } from '../../redux/task/operations.js';

const schema = yup.object().shape({
  title: yup.string().min(2).required(),
  description: yup.string().min(2).required(),
});

export default function CreateCardModalWindow({
  isOpen,
  handleModalClose,
  columnId,
}) {
  const [priority, setPiority] = useState('Without priority');
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();

  const newDate = new Date();

  console.log("startDate: ", startDate.toDateString());
  console.log("new Date: ", newDate.toDateString());
  console.log("compare: ", startDate.toDateString() == newDate.toDateString());

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
    const createdCard = {
      title: data.title,
      description: data.description,
      priority,
      columnId,
      deadline: startDate,
    };
    console.log(createdCard);
    dispatch(
      createCard({
        title: data.title,
        description: data.description,
        priority,
        columnId,
        deadline: startDate,
      })
    );
  };

  return (
    <ReactModal
      isOpen={isOpen}
      className={css.modalWindowWrp}
      overlayClassName={css.modalOverlay}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      onRequestClose={handleModalClose}
      ariaHideApp={false}
    >
      <form className={css.modalWindow} onSubmit={handleSubmit(onSubmit)}>
        <button className={css.modalWindowCloseBtn}>
          <svg stroke="black" width="9" height="9" aria-label="close-btn">
            <use href={`${sprite}#icon-x-close`}></use>
          </svg>
        </button>
        <p className={css.modalWindowHeader}>Add card</p>
        <input
          className={css.taskTitleInput}
          {...register('title')}
          name="title"
          placeholder="Title"
        />
        <ErrorMessage name="title" errors={errors} />
        <textarea
          className={css.taskDescriptionInput}
          {...register('description')}
          name="description"
          placeholder="Description"
        />
        <ErrorMessage name="description" errors={errors} />
        <p className={css.taskPriorityHeader}>Label color</p>
        <div className={css.taskPriorityInputsWrp}>
          <div className={css.prorityWrp}>
            <input
              className={css.radioInput}
              type="radio"
              name="priority"
              value="Low"
              id="low"
              onChange={onPriorityChange}
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
            />
            <div className={`${css.styledRadio} ${css.mediumPriorityColor}`}></div>
          </div>
          <div className={css.prorityWrp}>
            <input
              className={css.radioInput}
              type="radio"
              name="priority"
              value="High"
              id="high"
              onChange={onPriorityChange}
            />
            <div className={`${css.styledRadio} ${css.highPriorityColor}`}></div>
          </div>
          <div className={css.prorityWrp}>
            <input
              className={css.radioInput}
              type="radio"
              name="priority"
              value="Without priority"
              id="without"
              onChange={onPriorityChange}
            />
            <div className={`${css.styledRadio} ${css.withoutPriorityColor}`}></div>
          </div>
        </div>
        <p className={css.deadlineHeader}>Deadline</p>
        <DatePicker
          dateFormat="yyyy/MM/dd"
          selected={startDate}
          onChange={date => setStartDate(date)}
          minDate={new Date()}
        />
        {startDate.toDateString() == newDate.toDateString() 
        ? <p>Today</p>
        : null 
        }
        <button type="submit">Add</button>
      </form>
    </ReactModal>
  );
}
