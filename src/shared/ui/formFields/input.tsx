import { UseFormRegisterReturn } from "react-hook-form";
import { Label } from "./label";
import style from "./mainField.module.scss";
import cn from "classnames";
import { ErrorMark, CorrectMark } from "@/icons";

type InputProps = {
  sub: boolean;
  id: string;
  label: string;
  type?: string;
  req?: boolean;
  placeholder?: string;
  error?: string;
  register: UseFormRegisterReturn;
  formatter?: (value: string) => string;
};

export const Input: React.FC<InputProps> = ({
  id,
  sub,
  label,
  req = false,
  type = "text",
  placeholder,
  error,
  register,
  formatter,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (formatter) {
      value = formatter(value);
      e.target.value = value;
    }
    register.onChange(e);
  };

  const fieldError = error ? "error" : "";
  return (
    <div className={style.input}>
      <Label text={label} htmlFor={id} required={req} />
      <div className={cn(style.input__field, style[fieldError])}>
        <input
          type={type}
          placeholder={placeholder}
          className={style.input__insideField}
          {...register}
          onChange={handleInputChange}
        />
        {sub ? error ? <ErrorMark /> : <CorrectMark /> : ""}
      </div>
      {error && <span className={style.input__errorMessage}>{error}</span>}
    </div>
  );
};
