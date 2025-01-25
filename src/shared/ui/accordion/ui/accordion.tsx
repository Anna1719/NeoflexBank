import { useState } from "react";
import { AccordionItem, TAccordionItem } from "../accordionItem";
import style from "./accordion.module.scss";

export type AccordionListItem = {
  id: number;
  accItem: TAccordionItem;
};

export const Accordion = ({ accList }: { accList: AccordionListItem[] }) => {
  const [openId, setId] = useState<number | null>(null);

  const handleItemClick = (id: number) => {
    setId((prevId) => (prevId === id ? null : id));
  };

  return (
    <ul className={style.accordion}>
      {accList.map((item) => {
        return (
          <AccordionItem
            onClick={() => handleItemClick(item.id)}
            accItem={item.accItem}
            isOpen={item.id === openId}
            key={item.id}
          />
        );
      })}
    </ul>
  );
};
