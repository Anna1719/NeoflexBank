import style from "./cashbackTab.module.scss";

const cashbackCards = [
  { id: 0, title: "For food delivery, cafes and restaurants", text: "5%" },
  { id: 1, title: "In supermarkets with our subscription", text: "5%" },
  { id: 2, title: "In clothing stores and children's goods", text: "2%" },
  {
    id: 3,
    title: "Other purchases and payment of services and fines",
    text: "1%",
  },
  { id: 4, title: "Shopping in online stores", text: "up to 3%" },
  { id: 5, title: "Purchases from our partners", text: "30%" },
];

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
