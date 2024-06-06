import css from './NeedHelp.module.css';

const NeedHelp = () => {
  return (
    <div className={css.container}>
      {/* <svg></svg> */}
      <p className={css.infoText}>
        If you need help width <br />
        <span className={css.perfectTask}>Task Pro</span>, check out our support
        resources or reach out to our customer support team.
      </p>
      {/* відкриття модального вікна link + icon*/}
      {/* закриття модального вікна */}
    </div>
  );
};

export default NeedHelp;
