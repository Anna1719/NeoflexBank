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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (id === "birthdate") {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length > 4) {
        value = `${value.slice(0, 4)}-${value.slice(4)}`;
      }
      if (value.length > 7) {
        value = `${value.slice(0, 7)}-${value.slice(7, 9)}`;
      }
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
