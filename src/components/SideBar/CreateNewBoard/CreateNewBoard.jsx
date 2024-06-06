import css from "../CreateNewBoard/CreateNewBoard.module.css";
import Icon from "../../Icon/Icon";

const CreateNewBoard = () => {
    return (
        <>
        {/* onClick додати */}
        <button className={css.button} type="button">
            <p className={css.buttonTitle}>Create a new board</p>
            <div className={css.buttonPlus}>
                <Icon 
                id="icon-plus"
                className={css.iconPlus}
                width={20}
                height={20}
                />
            </div>
        </button>
        {/* додати відкриття модального вікна */}
        </>
    )
}

export default CreateNewBoard;