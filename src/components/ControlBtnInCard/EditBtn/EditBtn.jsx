import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './EditBtn.module.css';
import sprite from '../../../assets/sprite.svg';
import {
  deleteCard,
  moveCard,
} from '../../../redux/ControlBtnInCard/operations';
import { selectColumns } from '../../../redux/ControlBtnInCard/selectors';

const formatDate = dateString => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function EditBtn({ card }) {
  const dispatch = useDispatch();
  const columns = useSelector(selectColumns);
  // console.log(columns);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDueToday, setIsDueToday] = useState(false);

  // useEffect(() => {
  //   const today = new Date().toISOString().split('T')[0]; // Получаем сегодняшнюю дату в формате YYYY-MM-DD
  //   setIsDueToday(card.deadline === today);
  // }, [card.deadline]);

  const handleDeleteCard = () => {
    dispatch(deleteCard('123123243'));
  };

  const handleMoveCard = targetColumnId => {
    dispatch(moveCard({ cardId: card._id, targetColumnId }));
  };

  return (
    <div className={css.card}>
      <ul className={css.container}>
        {/* <li className={css.dateItem}>{formatDate(card.deadline)}</li> */}
        <li className={css.priority}>Priority</li>
        <li className={css.dateItem}>{formatDate('01 / 02 / 2000')}</li>

        <li>
          <button>
            <svg
              className={`${css.icon} `}
              // ${isDueToday ? css.deadline : ''}
              width="16"
              height="16"
            >
              <use xlinkHref={`${sprite}#icon-bell`} />
            </svg>
          </button>
        </li>
        <li className={css.dropdown}>
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <svg className={css.icon} width="16" height="16">
              <use xlinkHref={`${sprite}#icon-arrow-circle-broken-right`} />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className={css.dropdownContent}>
              {columns.map(column => (
                <a
                  key={column._id}
                  href="#"
                  onClick={() => handleMoveCard(column._id)}
                >
                  {column.name}
                </a>
              ))}
            </div>
          )}
        </li>
        <li>
          <button>
            <svg className={css.icon} width="16" height="16">
              <use xlinkHref={`${sprite}#icon-pen`} />
            </svg>
          </button>
        </li>
        <li>
          <button onClick={handleDeleteCard}>
            <svg className={css.icon} width="16" height="16">
              <use xlinkHref={`${sprite}#icon-trash`} />
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
}

// import css from './EditBtn.module.css';
// import sprite from '../../../assets/sprite.svg';
// import {
//   deleteCard,
//   moveCard,
// } from '../../../redux/ControlBtnInCard/operations';

// import { useDispatch } from 'react-redux';

// export default function EditBtn({ id }) {
//   const dispatch = useDispatch();

//   const handledeleteCard = () => {
//     dispatch(deleteCard());
//   };

//   return (
//     <div className={css.card}>
//       <ul className={css.container}>
//         <li>
//           <button>
//             <svg className={css.icon} width="16" height="16">
//               <use xlinkHref={`${sprite}#icon-bell`} />
//             </svg>
//           </button>
//         </li>
//         <li className={css.dropdown}>
//           <button onClick={moveCard}>
//             <svg className={css.icon} width="16" height="16">
//               <use xlinkHref={`${sprite}#icon-arrow-circle-broken-right`} />
//             </svg>
//           </button>
//           <div className={css.dropdownContent}>
//             <a
//               href="#"
//               onClick={() => {
//                 console.log('1');
//               }}
//             >
//               Действие 1
//             </a>
//             <a
//               href="#"
//               onClick={() => {
//                 console.log('2');
//               }}
//             >
//               Действие 2
//             </a>
//             <a
//               href="#"
//               onClick={() => {
//                 console.log('3');
//               }}
//             >
//               Действие 3
//             </a>
//           </div>
//         </li>
//         <li>
//           <button>
//             <svg className={css.icon} width="16" height="16">
//               <use xlinkHref={`${sprite}#icon-pen`} />
//             </svg>
//           </button>
//         </li>
//         <li>
//           <button onClick={handledeleteCard}>
//             <svg className={css.icon} width="16" height="16">
//               <use xlinkHref={`${sprite}#icon-trash`} />
//             </svg>
//           </button>
//         </li>
//       </ul>
//     </div>
//   );
// }

// // #icon-arrow-circle-broken-right
// // ../../../assets/sprite.svg#icon-arrow-circle-broken-right
