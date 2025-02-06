import style from "./conditionsTab.module.scss";
import { ratesAndConditions } from "@/utils/tabSectionProps";

export const ConditionsTab = () => {
  return (
    <div className={style.conditions}>
      <ul className={style.conditions__list}>
        {ratesAndConditions.map((item) => (
          <li key={item.id} className={style.conditions__item}>
            <div className={style.conditions__itemTitle}>{item.title}</div>
            <div className={style.conditions__itemText}>
              {item.text.map((line) => (
                <p className={style.conditions__itemTextLine}>{line}</p>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
