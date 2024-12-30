import { useState } from "react";
import { AccordionItem, TAccordionItem } from "../accordionItem";
import style from "./accordion.module.scss";

export type AccordionListItem = {
  id: number;
  accItem: TAccordionItem;
};

export const Accordion = ({ accList }: { accList: AccordionListItem[] }) => {
  const [openId, setId] = useState<number | null>(null);

  return (
    <ul className={style.accordion}>
      {accList.map((item) => {
        return (
          <AccordionItem
            onClick={() => (item.id === openId ? setId(null) : setId(item.id))}
            accItem={item.accItem}
            isOpen={item.id === openId}
            key={item.id}
          />
        );
      })}
    </ul>
  );
};
