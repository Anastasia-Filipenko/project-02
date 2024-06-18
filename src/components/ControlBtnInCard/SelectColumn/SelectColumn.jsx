import React, { useEffect, useRef } from 'react';
import css from './SelectColumn.module.css';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../../redux/theme/selectors';
import clsx from 'clsx';
import sprite from '../../../assets/sprite.svg';
export const SelectColumn = ({
  title,
  options,
  selectedOption,
  isOpen,
  onClose,
  handleOptionClick,
  openBtnRef,
  forCard,
}) => {
  const customOptionListRef = useRef(null);
  const selectedTheme = useSelector(selectTheme);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        isOpen &&
        customOptionListRef.current &&
        !customOptionListRef.current.contains(event.target) &&
        openBtnRef.current !== event.target
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      className={clsx(css.container, css[selectedTheme])}
      ref={customOptionListRef}
      style={{
        '--max-height': forCard ? '145px' : '200px',
        '--position-top': forCard ? '24px' : '20px',
        '--position-left': forCard ? '-121px' : '-135px',
        '--font-size': forCard ? '14px' : '14px',
      }}
    >
      <ul className={clsx(css.list, css[selectedTheme])}>
        {options.map(option => (
          <li
            className={clsx(css.select, css[selectedTheme])}
            key={option}
            onClick={() => handleOptionClick(option)}
            selected={selectedOption === option ? true : false}
          >
            {option}
            {selectedOption === option && (
              <span className={css.current}>(current)</span>
            )}
            <svg
              className={clsx(css.icon, css[selectedTheme])}
              width="16"
              height="16"
            >
              <use xlinkHref={`${sprite}#icon-arrow-circle-broken-right`} />
            </svg>
          </li>
        ))}
      </ul>
    </div>
  );
};
