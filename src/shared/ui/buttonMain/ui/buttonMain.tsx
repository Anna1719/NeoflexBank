import style from "./buttonMain.module.scss";
import cn from "classnames";

type TProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  radius?: string;
  width?: string;
};

export const ButtonMain = ({ radius = "16", width = "0", ...rest }: TProps) => {
  const borderRadius = "buttonRadius-" + radius;
  const buttonWidth = "buttonWidth-" + width;
  return (
    <button
      {...rest}
      className={cn(
        style.buttonMain,
        style[borderRadius],
        style[buttonWidth],
        rest.className
      )}
    ></button>
  );
};
