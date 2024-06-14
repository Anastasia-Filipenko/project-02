import css from '../Loader/Loader.module.css';
import loaderGif from '../../assets/kitty.gif';
export default function Loader() {
  return (
    <div className={css.loader}>
      <img className={css.loaderGif} src={loaderGif} alt="Loading..." />
    </div>
  );
}
