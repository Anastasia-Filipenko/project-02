import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './EditBtn.module.css';
import sprite from '../../../assets/sprite.svg';
import {
  deleteCard,
  moveCard,
} from '../../../redux/ControlBtnInCard/operations';

import { selectCards } from '../../../redux/task/selectors';
import { selectCurrentColumn } from '../../../redux/ControlBtnInCard/selectors.js';
import { selectColumn } from '../../../redux/columns/selectors';
import { SelectColumn } from '../SelectColumn/SelectColumn';

import EditCardModalWindow from "./EditCardModalWindow/EditCardModalWindow.jsx";

export default function EditBtn({ cardInfo }) {
  const dispatch = useDispatch();

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

  const columnOptionsList = boardColumns.map(column => column.title);
  const columnsAmount = columnOptionsList.length;

  const handleMoveCard = selectedColumnTitle => {
    if (selectedColumnTitle === title) {
      return;
    }
    const newColumnId = boardColumns.find(
      column => column.title === selectedColumnTitle
    )._id;
    const body = {
      newColumnId,
      newOrderInColumn: 'last',
    };
    dispatch(moveCard({ _id, body }));
    toggleCustomOptionList();
  };

  const handleDeleteCard = () => {
    dispatch(deleteCard(_id));
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
    <div className={css.card}>
      <ul className={css.container}>
        <li>
          <button
            onClick={handleOpenModal}
            className={isButtonActive ? css.buttonActive : ''}
          >
            <svg className={`${css.icon}`} width="16" height="16">
              <use xlinkHref={`${sprite}#icon-bell`} />
            </svg>
          </button>
          {/* <Modal show={showModal} onClose={handleCloseModal} /> */}
          {/*вместо Modal вставить компонент с мональным окном */}
        </li>

        <li className={css.dropdown}>
          {columnsAmount > 1 && (
            <button
              ref={moveCardBtn}
              type="button"
              onClick={openCustomOptionList}
            >
              <svg className={css.icon} width="16" height="16">
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
        <li>
          <button onClick={() => handleOpenModal()}>
            <svg className={css.icon} width="16" height="16">
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
        <li>
          <button
            type="button"
            onClick={() => {
              handleDeleteCard();
            }}
          >
            <svg className={css.icon} width="16" height="16">
              <use xlinkHref={`${sprite}#icon-trash`} />
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
}
