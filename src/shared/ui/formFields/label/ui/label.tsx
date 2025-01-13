import style from "./label.module.scss";

type TProps = {
  text?: string;
  htmlFor: string;
  required?: boolean;
};

export const Label = ({ text, htmlFor, required }: TProps) => {
  return (
    <label htmlFor={htmlFor} className={style.label}>
      {text} {required ? <span className={style.label__required}>*</span> : ""}
    </label>
  );
};
