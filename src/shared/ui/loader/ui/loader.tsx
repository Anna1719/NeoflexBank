import style from "./loader.module.scss";

// Лоадер изменен, оверлей убран

export const Loader = () => (
  <div className={style.loader}>
  <div className={style.loader__overlay}>
    <div>
      <span className={style.loader__content}></span>
    </div>
  </div>
  </div>
);