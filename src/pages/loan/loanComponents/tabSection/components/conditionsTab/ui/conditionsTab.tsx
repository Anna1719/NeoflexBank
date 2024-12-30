import style from "./conditionsTab.module.scss";

const ratesAndConditions = [
  { id: 1, title: "Card currency", text: ["Rubles, dollars, euro"] },
  { id: 2, title: "Interest free period", text: ["0% up to 160 days"] },
  { id: 3, title: "Payment system", text: ["Mastercard, Visa"] },
  { id: 4, title: "Maximum credit limit on the card", text: ["600 000 ₽"] },
  {
    id: 5,
    title: "Replenishment and withdrawal",
    text: [
      "At any ATM. Top up your credit card for free with cash or transfer from other cards",
    ],
  },
  { id: 6, title: "Max cashback per month", text: ["15 000 ₽"] },
  {
    id: 7,
    title: "Transaction Alert",
    text: [
      "60 ₽ — SMS or push notifications",
      "0 ₽ — card statement, information about transactions in the online bank",
    ],
  },
];

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
