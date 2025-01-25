import { Offer } from "@/store/types";
import style from "./offerItem.module.scss";
import { ErrorMark, CorrectMark } from "@/icons";

export const OfferItem = ({ offer }: { offer: Offer }) => {
  return (
    <div className={style.offerItem}>
      <p className={style.offerItem__content}>
        Requested amount: {offer.requestedAmount.toLocaleString("ru")} ₽
      </p>
      <p className={style.offerItem__content}>
        Total amount: {offer.totalAmount.toLocaleString("ru")} ₽
      </p>
      <p className={style.offerItem__content}>For {offer.term} mounth</p>
      <p className={style.offerItem__content}>
        Monthly amount: {Math.round(offer.monthlyPayment).toLocaleString("ru")}{" "}
        ₽
      </p>
      <p className={style.offerItem__content}>Your rate: {offer.rate} %</p>
      <p className={style.offerItem__content}>
        Insurance included{" "}
        {offer.isInsuranceEnabled ? <CorrectMark /> : <ErrorMark />}
      </p>
      <p className={style.offerItem__content}>
        Salary client {offer.isSalaryClient ? <CorrectMark /> : <ErrorMark />}
      </p>
    </div>
  );
};
