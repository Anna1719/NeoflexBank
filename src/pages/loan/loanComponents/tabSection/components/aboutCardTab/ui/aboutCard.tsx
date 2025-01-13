import { BagIcon } from "@/icons/BagIcon";
import style from "./aboutCard.module.scss";
import { MoneyIcon } from "@/icons/MoneyIcon";
import { CalendarIcon } from "@/icons/CalendarIcon";
import { ClockIcon } from "@/icons/ClockIcon";
import { CardIcon } from "@/icons/CardIcon";

const aboutCardItems = [
  {
    id:0,
    icon: <MoneyIcon />,
    title: "Up to 50 000 ₽",
    subtitle: "Cash and transfers without commission and percent",
  },
  {
    id:1,
    icon: <CalendarIcon />,
    title: "Up to 160 days",
    subtitle: "Without percent on the loan",
  },
  {
    id:2,
    icon: <ClockIcon />,
    title: "Free delivery",
    subtitle:
      "We will deliver your card by courier at a convenient place and time for you",
  },
  {
    id:3,
    icon: <BagIcon />,
    title: "Up to 12 months",
    subtitle:
      "No percent. For equipment, clothes and other purchases in installments",
  },
  {
    id:4,
    icon: <CardIcon />,
    title: "Convenient deposit and withdrawal",
    subtitle:
      "At any ATM. Top up your credit card for free with cash or transfer from other cards",
  },
];

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
