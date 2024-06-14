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
import { useDispatch } from 'react-redux';

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
      //   className={css.modalWindowWrp}
      //   overlayClassName={css.modalOverlay}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      onRequestClose={handleModalClose}
      ariaHideApp={false}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <button>
          <svg>
            <use href={`${sprite}#icon-x-close`}></use>
          </svg>
        </button> */}
        <p>Add card</p>
        <input {...register('title')} name="title" placeholder="Title" />
        <ErrorMessage name="title" errors={errors} />
        <textarea
          {...register('description')}
          name="description"
          placeholder="Description"
        />
        <ErrorMessage name="description" errors={errors} />
        <p>Label color</p>
        <input
          type="radio"
          name="priority"
          value="Low"
          id="low"
          checked={priority === 'low'}
          onChange={onPriorityChange}
        />
        <input
          type="radio"
          name="priority"
          value="Medium"
          id="medium"
          checked={priority === 'medium'}
          onChange={onPriorityChange}
        />
        <input
          type="radio"
          name="priority"
          value="High"
          id="high"
          checked={priority === 'high'}
          onChange={onPriorityChange}
        />
        <input
          type="radio"
          name="priority"
          value="Without priority"
          id="without"
          checked={priority === 'without'}
          onChange={onPriorityChange}
        />
        <p>Deadline</p>
        <DatePicker
          dateFormat="yyyy/MM/dd"
          selected={startDate}
          onChange={date => setStartDate(date)}
        />
        <button type="submit">Add</button>
      </form>
    </ReactModal>
  );
}
