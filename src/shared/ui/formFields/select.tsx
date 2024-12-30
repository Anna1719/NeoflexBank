import { UseFormRegisterReturn } from "react-hook-form";
import { Label } from "./label";
import style from "./mainField.module.scss";
import cn from "classnames";
import { termOptionType } from "@/utils/formTypes";

type SelectProps = {
  id: string;
  req?: boolean;
  label: string;
  error?: string;
  options?: termOptionType[];
  register: UseFormRegisterReturn;
};

export const Select: React.FC<SelectProps> = ({
  id,
  req = false,
  label,
  options,
  error,
  register,
}) => {
  const fieldError = error ? "error" : "";
  return (
    <div className={style.select}>
      <Label text={label} htmlFor={id} required={req} />
      <select
        className={cn(style.select__field, style[fieldError])}
        {...register}
      >
        {options ? options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        )):("")}
      </select>
      {error && <span className={style.select__errorMessage}>{error}</span>}
    </div>
  );
};
