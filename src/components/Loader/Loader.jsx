import css from '../Loader/Loader.module.css';
export default function Loader() {
  return (
    <div className={css.loader}>
      <img
        className={css.loaderGif}
        src="https://res.cloudinary.com/dyqmk6bfl/image/upload/v1718737840/8tuoc0_1_hzapbp.gif"
        alt="Loading..."
      />
    </div>
  );
}
