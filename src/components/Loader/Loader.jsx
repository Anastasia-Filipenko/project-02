import { Bars } from 'react-loader-spinner';
import css from '../Loader/Loader.module.css';

export default function Loader() {
  return (
    <Bars
      height="80"
      width="80"
      color="grey"
      ariaLabel="bars-loading"
      wrapperClass={css.loader}
      visible={true}
    />
  );
}
