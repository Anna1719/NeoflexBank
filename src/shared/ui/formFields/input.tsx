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
}) => {
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
        />
        {sub ? ( error? <ErrorMark /> : <CorrectMark />): ""}
      </div>
      {error && <span className={style.input__errorMessage}>{error}</span>}
    </div>
  );
};
