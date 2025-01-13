import { useEffect, useState } from "react";
import style from "./currencyRates.module.scss";
import { BankLogo } from "@/icons/BankLogo";
import { fetchExchangeRates } from "../api/currencyRequest";

const currencies = ["USD", "CNY", "CHF", "EUR", "JPY", "TRY"];
const updateInterval = 15 * 60 * 1000;

interface Rates {
  [key: string]: number;
}

export const CurrencyRates = () => {
  const [rates, setRates] = useState<Rates | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const updateCurrencyRates = async () => {
    const newRates = await fetchExchangeRates("RUB");
    setRates(newRates);
    const now = new Date();
    setLastUpdated(`MSC ${now.toLocaleTimeString("ru-RU")}`);
  };

  useEffect(() => {
    updateCurrencyRates();
    const interval = setInterval(updateCurrencyRates, updateInterval);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={style.converter}>
      <div className={style.converter__wrapper}>
        <div className={style.converter__header}>
          <h3 className={style.converter__title}>
            Exchange rate in internet bank
          </h3>
          <div className={style.converter__update}>
            {lastUpdated
              ? `Update every 15 minutes, ${lastUpdated}`
              : "Loading..."}
          </div>
        </div>
        <div className={style.converter__label}>Currency</div>
        <div className={style.converter__content}>
          <div className={style.converter__list}>
            {currencies.map((currency) => (
              <div key={currency} className={style.converter__currency}>
                <span className={style.converter__currencyName}>
                  {currency}:
                </span>
                <span className={style.converter__currencyRate}>
                  {rates ? (1 / rates[currency]).toFixed(2) : "N/A"}
                </span>
              </div>
            ))}
          </div>
          <div className={style.converter__icon}>
            <BankLogo />
          </div>
        </div>
        <div className={style.converter__allCourses}>All courses</div>
      </div>
    </section>
  );
};
