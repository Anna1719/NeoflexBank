import axios from "axios";

interface Rates {
  [key: string]: number;
}

export const fetchExchangeRates = async (
  baseCurrency: string
): Promise<Rates | null> => {
  const url = `${import.meta.env.VITE_REACT_CURRENCY_API_HOST}/${
    import.meta.env.VITE_REACT_CURRENCY_API_KEY
  }/latest/${baseCurrency}`;

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
