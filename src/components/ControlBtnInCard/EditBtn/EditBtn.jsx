import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './EditBtn.module.css';
import sprite from '../../../assets/sprite.svg';

import { selectCards } from '../../../redux/task/selectors';
import { SelectColumn } from '../SelectColumn/SelectColumn';

import EditCardModalWindow from './EditCardModalWindow/EditCardModalWindow.jsx';
import { selectTheme } from '../../../redux/auth/selectors';
import clsx from 'clsx';

import { deleteCard, moveCard } from '../../../redux/task/operations.js';

export default function EditBtn({ cardInfo }) {
  const dispatch = useDispatch();
  const selectedTheme = useSelector(selectTheme);

  const moveCardBtn = useRef(null);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isCustomOptionListOpen, setCustomOptionListOpen] = useState(false);

  ///// edit modal window made by Max
  const [isOpen, setIsOpen] = useState(false);
  function handleOpenModal() {
    setIsOpen(true);
  }
  function handleModalClose() {
    setIsOpen(false);
  }
  ///// edit modal window made by Max

  const boardColumns = useSelector(state => state.columns.items);
  const cards = useSelector(selectCards);
  const { column, deadline, _id, title } = useSelector(selectCards);

  useEffect(() => {
    const backendDate = new Date(deadline);
    const today = new Date();

    const isActive =
      backendDate.getDate() === today.getDate() &&
      backendDate.getMonth() === today.getMonth() &&
      backendDate.getFullYear() === today.getFullYear();

    setIsButtonActive(isActive);
  }, [deadline]);

  const getIconClass = () => {
    return isCustomOptionListOpen ? css.iconMove : '';
  };

  const columnOptionsList = boardColumns
    .map(column => column.title)
    .filter(c => c !== cardInfo.columnTitle);
  const columnsAmount = columnOptionsList.length;

  const handleMoveCard = selectedColumnTitle => {
    const newColumnId = boardColumns.find(
      column => column.title === selectedColumnTitle
    )._id;

    const cardId = cardInfo._id;
    dispatch(moveCard({ cardId, newColumnId }));
    toggleCustomOptionList();
  };

  const handleDeleteCard = () => {
    const cardId = cardInfo._id;
    dispatch(deleteCard(cardId));
  };

  const toggleCustomOptionList = () => {
    setCustomOptionListOpen(!isCustomOptionListOpen);
  };

  const openCustomOptionList = event => {
    event.stopPropagation();
    toggleCustomOptionList();
  };

  // const handleOpenModal = () => {
  //   setShowModal(true);
  // };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };

  return (
    <>
      <li className={clsx(css.dropdown, css.list)}>
        {columnsAmount > 1 && (
          <button
            className={clsx(css.btn, css[selectedTheme])}
            ref={moveCardBtn}
            type="button"
            onClick={openCustomOptionList}
          >
            <svg
              className={clsx(css.icon, getIconClass(), css[selectedTheme])}
              width="16"
              height="16"
            >
              <use xlinkHref={`${sprite}#icon-arrow-circle-broken-right`} />
            </svg>
          </button>
        )}
        {isCustomOptionListOpen && (
          <SelectColumn
            title="Move to column"
            options={columnOptionsList}
            selectedOption={title}
            isOpen={isCustomOptionListOpen}
            onClose={toggleCustomOptionList}
            handleOptionClick={handleMoveCard}
            openBtnRef={moveCardBtn}
            forCard
          />
        )}
      </li>
      <li className={css.list}>
        <button
          className={clsx(css.btn, css[selectedTheme])}
          onClick={() => handleOpenModal()}
        >
          <svg
            className={clsx(css.icon, css[selectedTheme])}
            width="16"
            height="16"
          >
            <use xlinkHref={`${sprite}#icon-pen`} />
          </svg>
        </button>
        {isOpen && (
          <EditCardModalWindow
            isOpen={isOpen}
            handleModalClose={handleModalClose}
            cardInfo={cardInfo}
          />
        )}
      </li>
      <li className={css.list}>
        <button
          className={clsx(css.btn, css[selectedTheme])}
          type="button"
          onClick={() => {
            handleDeleteCard();
          }}
        >
          <svg
            className={clsx(css.icon, css[selectedTheme])}
            width="16"
            height="16"
          >
            <use xlinkHref={`${sprite}#icon-trash`} />
          </svg>
        </button>
      </li>
    </>
  );
}
