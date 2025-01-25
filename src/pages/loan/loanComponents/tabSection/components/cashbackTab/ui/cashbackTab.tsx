import style from "./cashbackTab.module.scss";
import { cashbackCards } from "@/utils/tabSectionProps";

export const CashbackTab = () => {
  return (
    <div className={style.cashbackTab}>
      <ul className={style.cashbackTab__list}>
        {cashbackCards.map((info) => (
          <li key={info.id} className={style.cashbackTab__item}>
            <div className={style.cashbackTab__title}>{info.title}</div>
            <div className={style.cashbackTab__text}>{info.text}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
