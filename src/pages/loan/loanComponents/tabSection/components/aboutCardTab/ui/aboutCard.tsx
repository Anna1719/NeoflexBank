import style from "./aboutCard.module.scss";
import { aboutCardItems } from "@/utils/tabSectionProps";

export const AboutCardTab = () => {
  return (
    <div className={style.aboutCard}>
      <ul className={style.aboutCard__list}>
        {aboutCardItems.map((info) => (
          <li key={info.id} className={style.aboutCard__item}>
            <div className={style.aboutCard__icon}>{info.icon}</div>
            <div className={style.aboutCard__title}>{info.title}</div>
            <div className={style.aboutCard__subtitle}>{info.subtitle}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
