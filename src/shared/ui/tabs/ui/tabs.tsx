import cn from "classnames";
import style from "./tabs.module.scss";
import { ReactNode } from "react";

export type TTab = {
  id: number;
  label?: string;
};

type TProps = {
  onClick: (id: number) => void;
  selectedId: number;
  tabs: TTab[];
  children?: ReactNode;
};

export const TabsComponent = ({
  onClick,
  selectedId,
  tabs,
  children = null,
}: TProps) => {
  return (
    <div>
      <div className={cn(style.tabs)}>
        {tabs &&
          tabs.map((tab: TTab) => (
            <div
              className={cn(
                style.tab,
                style[tab.id === selectedId ? "openTab" : "closeTab"]
              )}
              key={tab.id}
              onClick={() => onClick(tab.id)}
            >
              <div className={cn(style.tab__label)}>{tab.label}</div>
            </div>
          ))}
      </div>
      {children}
    </div>
  );
};
