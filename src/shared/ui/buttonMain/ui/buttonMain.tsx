import style from "./buttonMain.module.scss";
import cn from "classnames";

type TProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  radius?: string;
};

export const ButtonMain = ({ radius, ...rest }: TProps) => {
  const borderRadius = "buttonRadius-" + radius;
  return (
    <button
      {...rest}
      className={cn(style.buttonMain, style[borderRadius], rest.className)}
    ></button>
  );
};
