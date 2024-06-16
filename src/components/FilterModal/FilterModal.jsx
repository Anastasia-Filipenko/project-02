import css from './FilterModal.module.css';
import clsx from 'clsx';
import sprite from '../../assets/sprite.svg';
import { selectTheme } from '../../redux/theme/selectors';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { setFilter } from '../../redux/filter/filterSlice';

Modal.setAppElement('#root');

const FilterModal = ({ isOpen, onClose }) => {
  const selectedTheme = useSelector(selectTheme);
  const dispatch = useDispatch();

  const handleFilterChange = event => {
    const { value } = event.target;
    dispatch(setFilter(value));
  };

  const handleShowAllClick = () => {
    dispatch(setFilter('show-all'));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={clsx(css.modal, css[selectedTheme])}
      overlayClassName={css.overlay}
    >
      <div className={clsx(css.filterModal, css[selectedTheme])}>
        <div className={clsx(css.filterModalTitle, css[selectedTheme])}>
          <p>Filters</p>
          <button className={css.closeButton} onClick={onClose}>
            <svg
              className={clsx(css.icon, css[selectedTheme])}
              width="18"
              height="18"
            >
              <use xlinkHref={`${sprite}#icon-x-close`}></use>
            </svg>
          </button>
        </div>
        <div>
          <div className={css.filterName}>
            <label className={clsx(css.label, css[selectedTheme])}>
              Label color
            </label>
            <a
              href="#showall"
              className={clsx(css.showAll, css[selectedTheme])}
              onClick={handleShowAllClick}
            >
              Show all
            </a>
          </div>
          <div className={css.filterOption}>
            <input
              type="radio"
              id="without"
              name="priority"
              value="Without priority"
              className={css.input}
              onChange={handleFilterChange}
            />
            <label
              htmlFor="without"
              className={clsx(
                css.checkboxLabelWithout,
                css.checkboxLabel,
                css[selectedTheme]
              )}
            >
              Without priority
            </label>
          </div>
          <div className={css.filterOption}>
            <input
              type="radio"
              id="low"
              name="priority"
              value="Low"
              className={css.input}
              onChange={handleFilterChange}
            />
            <label
              htmlFor="low"
              className={clsx(
                css.checkboxLabelLow,
                css.checkboxLabel,
                css[selectedTheme]
              )}
            >
              Low
            </label>
          </div>
          <div className={css.filterOption}>
            <input
              type="radio"
              id="medium"
              name="priority"
              value="Medium"
              className={css.input}
              onChange={handleFilterChange}
            />
            <label
              htmlFor="medium"
              className={clsx(
                css.checkboxLabelMedium,
                css.checkboxLabel,
                css[selectedTheme]
              )}
            >
              Medium
            </label>
          </div>
          <div className={css.filterOption}>
            <input
              type="radio"
              id="high"
              name="priority"
              value="High"
              className={css.input}
              onChange={handleFilterChange}
            />
            <label
              htmlFor="high"
              className={clsx(
                css.checkboxLabelHigh,
                css.checkboxLabel,
                css[selectedTheme]
              )}
            >
              High
            </label>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FilterModal;
