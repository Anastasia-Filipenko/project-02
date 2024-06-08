import css from '../CreateNewBoard/CreateNewBoard.module.css';
import sprite from "../../../assets/sprite.svg";

const CreateNewBoard = () => {
  return (
    <div className={css.create}>
      {/* onClick додати */}
      <p className={css.buttonTitle}>Create a new board</p>
      <button className={css.button} type="button">
        <div className={css.buttonPlus}>
          <svg className={css.iconPlus} width="20" height="20">
            <use xlinkHref={`${sprite}#icon-plus`}></use>
          </svg>
        </div>
      </button>
      {/* додати відкриття модального вікна */}
    </div>
  );
};

export default CreateNewBoard;
