import style from "./loader.module.scss";

export const Loader = () => <span className={style.loader}></span>;

export const LoaderOverlay = () => (
  <div className={style.overlay}>
    <div>
      <span className={style.loader}></span>
    </div>
  </div>
);