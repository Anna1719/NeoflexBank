import { useEffect, useState } from "react";
import axios from "axios";
import style from "./currencyRates.module.scss";
import { currencyAPI } from "@/shared/api/currencyAPI";
import { BankLogo } from "@/icons";

const currencies = ["USD", "CNY", "CHF", "EUR", "JPY", "TRY"];
const updateInterval = 15 * 60 * 1000;

interface Rates {
  [key: string]: number;
}

const API_HOST = currencyAPI.API_HOST;
const API_KEY = currencyAPI.API_KEY;

export const CurrencyRates: React.FC = () => {
  const [rates, setRates] = useState<Rates | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchExchangeRates = async (
    baseCurrency: string
  ): Promise<Rates | null> => {
    const url = `${API_HOST}/${API_KEY}/latest/${baseCurrency}`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      if (data.result === "success") {
        return data.conversion_rates;
      } else {
        console.error("Ошибка получения курсов:", data["error-type"]);
        return null;
      }
    } catch (error) {
      console.error("Ошибка сети или запроса:", error);
      return null;
    }
  };

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
          <h3>Exchange rate in internet bank</h3>
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
