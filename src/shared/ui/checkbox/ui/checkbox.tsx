import style from "./checkbox.module.scss";

type TProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
};

export const Checkbox = ({ checked, onChange, label, ...rest }: TProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };
  return (
    <div className={style.checkbox}>
      <input
        {...rest}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className={style.checkbox__input}
      />
      <label htmlFor={rest.id} className={style.checkbox__label}>{label}</label>
    </div>
  );
};
