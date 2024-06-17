import css from './taskCard.module.css';
import clsx from 'clsx';
import sprite from '../../../assets/sprite.svg';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../../redux/theme/selectors';
import EditBtn from '../../ControlBtnInCard/EditBtn/EditBtn';

export default function TaskCard({ cardInfo }) {
  const date = cardInfo.deadline;
  const deadlineDate = format(date, 'dd/MM/yyyy');
  console.log('deadlineDate: ', deadlineDate);

  const dateNow = new Date();
  const dateToday = format(dateNow, 'dd/MM/yyyy');
  console.log('dateToday: ', dateToday);

  const isDeadlineToday = deadlineDate === dateToday;
  console.log('isDeadlineToday: ', isDeadlineToday);

  const isDeadlineTodayToString = isDeadlineToday.toString();
  console.log('isDeadlineTodayToString: ', isDeadlineTodayToString);

  const selectedTheme = useSelector(selectTheme);
  console.log(selectedTheme);

  function formatPriority(priority) {
    if (priority === 'Without priority') {
      return 'Without';
    } else {
      return priority;
    }
  }

  return (
    <li className={css.cardListItem}>
      <div
        className={clsx(
          css.taskCard,
          css[formatPriority(cardInfo.priority)],
          css[selectedTheme]
        )}
      >
        <div className={clsx(css.taskCardHeader, css[selectedTheme])}>
          <p className={clsx(css.cardTitle, css[selectedTheme])}>
            {cardInfo.title}
          </p>
          <div className={css.cardDescriptionWrp}>
            <p className={clsx(css.cardDescription, css[selectedTheme])}>
              {cardInfo.description}
            </p>
          </div>
        </div>
        <div className={css.taskCardFooter}>
          <div className={css.priorityWrp}>
            <p className={clsx(css.priorityHeader, css[selectedTheme])}>
              Priority
            </p>
            <div className={css.priorityItems}>
              <div
                className={clsx(
                  css.prioritySign,
                  css[formatPriority(cardInfo.priority)],
                  css[selectedTheme]
                )}
              ></div>
              <p className={clsx(css.priorityText, css[selectedTheme])}>
                {formatPriority(cardInfo.priority)}
              </p>
            </div>
          </div>
          <div className={css.deadlineWrp}>
            <p className={clsx(css.deadlineHeader, css[selectedTheme])}>
              Deadline
            </p>
            <p className={clsx(css.deadlineDate, css[selectedTheme])}>
              {deadlineDate}
            </p>
          </div>
          <ul className={css.iconContainer}>
            <li>
              <div
                className={clsx(css.deadlineBell, css[isDeadlineTodayToString])}
              >
                <svg
                  className={clsx(css.icon, css[selectedTheme])}
                  width="16"
                  height="16"
                  aria-label="close-btn"
                >
                  <use href={`${sprite}#icon-bell`}></use>
                </svg>
              </div>
            </li>

            <EditBtn cardInfo={cardInfo} />
          </ul>
        </div>
      </div>
    </li>
  );
}
