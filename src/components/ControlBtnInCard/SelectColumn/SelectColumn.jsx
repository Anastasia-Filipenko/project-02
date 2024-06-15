import React, { useEffect, useRef } from 'react';
import css from './SelectColumn.module.css';

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
      className={css.container}
      ref={customOptionListRef}
      style={{
        '--max-height': forCard ? '145px' : '200px',
        '--position-top': forCard ? '-112px' : '20px',
        '--position-left': forCard ? '-110px' : '-135px',
        '--font-size': forCard ? '12px' : '14px',
      }}
    >
      <h4 className={css.title}>{title}</h4>
      <ul className={css.list}>
        {options.map(option => (
          <li
            className={css.select}
            key={option}
            onClick={() => handleOptionClick(option)}
            selected={selectedOption === option ? true : false}
          >
            {option}
            {selectedOption === option && (
              <span className={css.current}>(current)</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
