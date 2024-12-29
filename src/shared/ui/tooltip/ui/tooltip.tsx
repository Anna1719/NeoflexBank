import style from "./tooltip.module.scss";
import { ReactNode, useState } from "react";
import cn from "classnames";

interface TooltipProps {
  tooltipText: string;
  children?: ReactNode;
}

export const Tooltip = ({ tooltipText, children = null }: TooltipProps) => {
  const [showToolTip, setShowToolTip] = useState(false);

  return (
    <div
      className={style.tooltip__container}
      onMouseEnter={() => setShowToolTip(true)}
      onMouseLeave={() => setShowToolTip(false)}
    >
      {children}
      <div
        className={cn(
          style.tooltip,
          style[showToolTip ? "openTooltip" : "closeTooltip"]
        )}
      >
        {tooltipText}
      </div>
    </div>
  );
};
