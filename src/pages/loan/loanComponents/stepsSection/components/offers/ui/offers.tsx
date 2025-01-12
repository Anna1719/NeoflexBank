import { useAxios } from "@/shared/hooks/useAxios";
import { setCurrentStep, setStepStatus } from "@/store/actions";
import { AppDispatch } from "@/store/store";
import { LoanState, Offer } from "@/store/types";
import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./offers.module.scss";
import { ButtonMain } from "@/shared/ui/buttonMain";
import { CorrectMark, ErrorMark } from "@/icons";

export const Offers = () => {
  const offers = useSelector((state: LoanState) => state.offers);

  const [axiosConfig, setAxiosConfig] = useState<AxiosRequestConfig | null>(
    null
  );

  const stepStatus = useSelector(
    (state: LoanState) => state.applicationData[2]?.status
  );

  const { success, loading } = useAxios<Offer[]>(axiosConfig);

  const dispatch = useDispatch<AppDispatch>();

  const handleSelectOffer = (offer: Offer) => {
    setAxiosConfig({
      method: "POST",
      url: "/application/apply",
      data: offer,
    });
  };

  useEffect(() => {
    if (!loading && success) {
      dispatch(setCurrentStep(3));
      dispatch(setStepStatus(2, { status: "isSent" }));
      dispatch(setStepStatus(3, { status: "isActive" }));
    }
  }, [loading, success, dispatch]);

  return stepStatus === "isSent" ? (
    <div className={style.offerMessage}>
      <h2 className={style.offerMessage__title}>
        The preliminary decision has been sent to your email.
      </h2>
      <p className={style.offerMessage__subtitle}>
        In the letter you can get acquainted with the preliminary decision on
        the credit card.
      </p>
    </div>
  ) : (
    <div className={style.offerList}>
      {offers.map((offer, index) => (
        <div className={style.offerList__item} key={index}>
          <img
            src="/images/SurpriseImage.png"
            alt="Surprise"
            className={style.offerList__img}
          />
          <div className={style.offerList__text}>
            <p className={style.offerList__textContent}>
              Requested amount: {offer.requestedAmount.toLocaleString("ru")} ₽
            </p>
            <p className={style.offerList__textContent}>
              Total amount: {offer.totalAmount.toLocaleString("ru")} ₽
            </p>
            <p className={style.offerList__textContent}>
              For {offer.term} mounth
            </p>
            <p className={style.offerList__textContent}>
              Monthly amount:{" "}
              {Math.round(offer.monthlyPayment).toLocaleString("ru")} ₽
            </p>
            <p className={style.offerList__textContent}>
              Your rate: {offer.rate} %
            </p>
            <p className={style.offerList__textContent}>
              Insurance included{" "}
              {offer.isInsuranceEnabled ? <CorrectMark /> : <ErrorMark />}
            </p>
            <p className={style.offerList__textContent}>
              Salary client{" "}
              {offer.isSalaryClient ? <CorrectMark /> : <ErrorMark />}
            </p>
          </div>
          <ButtonMain
            radius={8}
            width={148}
            onClick={() => handleSelectOffer(offer)}
          >
            Select
          </ButtonMain>
        </div>
      ))}
    </div>
  );
};
