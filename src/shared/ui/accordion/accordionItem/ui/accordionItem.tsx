import { ReactNode, useRef } from "react";
import { ExpendUp} from "@/icons/ExpendUp";
import style from "./accordionItem.module.scss";
import { ExpendDown } from "@/icons/ExpendDown";

export type TAccordionItem = {
  title: string;
  content: ReactNode;
};

type TProps = {
  accItem: TAccordionItem;
  onClick: () => void;
  isOpen: boolean;
};

export const AccordionItem = ({ accItem, onClick, isOpen }: TProps) => {
  const itemRef = useRef<HTMLDivElement>(null);

  // ()=>onClick() изменено на onClick

  return (
    <li className={style.accordionItem}>
      <button className={style.accordionItem__button} onClick={onClick}>
        {accItem.title}
        {isOpen ? <ExpendUp /> : <ExpendDown />}
      </button>
      <div
        className={style.accordionItem__collapse}
        style={{ height: isOpen ? itemRef.current?.scrollHeight : "0px" }} // isOpen теперь внутри свойства
      >
        <div className={style.accordionItem__content} ref={itemRef}>
          {accItem.content}
        </div>
      </div>
    </li>
  );
};
