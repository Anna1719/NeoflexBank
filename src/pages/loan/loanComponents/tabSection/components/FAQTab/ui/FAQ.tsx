import { Accordion } from "@/shared/ui/accordion";
import style from "./FAQ.module.scss";
import {
  AccordionListFirst,
  AccordionListSecond,
} from "@/utils/tabSectionProps/FAQTab";

export const FAQTab = () => {
  return (
    <div className={style.FAQTab}>
      <h2 className={style.FAQTab__title}>Issuing and receiving a card</h2>
      <Accordion accList={AccordionListFirst}></Accordion>
      <h2 className={style.FAQTab__title}>Using a credit card</h2>
      <Accordion accList={AccordionListSecond}></Accordion>
    </div>
  );
};
