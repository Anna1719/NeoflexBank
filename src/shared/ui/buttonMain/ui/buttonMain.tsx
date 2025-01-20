import style from "./buttonMain.module.scss";
import cn from "classnames";

// Радиус и ширина теперь принимают числовые значеия
type TProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  radius?: number;
  width?: number;
  color?: string;
  height?: number;
};

export const ButtonMain = ({ radius = 16, width = 0, color = "", height = 0,...rest }: TProps) => {
  const borderRadius = "buttonRadius-" + radius;
  const buttonWidth = "buttonWidth-" + width;
  const buttonColor = "buttonColor-" + color;
  const buttonHeight = "buttonHeight-" + height;
  return (
    <button
      {...rest}
      className={cn(
        style.buttonMain,
        style[borderRadius],
        style[buttonWidth],
        style[buttonColor],
        style[buttonHeight],
        rest.className
      )}
    ></button>
  );
};
