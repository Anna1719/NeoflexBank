import style from "./successMessage.module.scss";

type TProps = {
  title: string;
  subtitle: string;
};

export const SuccessMessage = ({ title, subtitle }: TProps) => {
  return (
    <div className={style.success}>
      <h2 className={style.success__title}>{title}</h2>
      <p className={style.success__subtitle}>{subtitle}</p>
    </div>
  );
};
