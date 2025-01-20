import { useAxios } from "@/shared/hooks/useAxios";
import { setCurrentStep, setStepStatus } from "@/store/actions";
import { AppDispatch } from "@/store/store";
import { LoanState, Offer } from "@/store/types";
import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./offers.module.scss";
import { ButtonMain } from "@/shared/ui/buttonMain";
import { OfferItem } from "../offerItem";
import { RenderBasedOnStatus } from "@/shared/ui/renderBasedOnStatus";

export const Offers = () => {
  const offers = useSelector((state: LoanState) => state.offers);
  const [axiosConfig, setAxiosConfig] = useState<AxiosRequestConfig | null>(
    null
  );
  const { success, loading, error } = useAxios<Offer[]>(axiosConfig);
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

  return (
    <RenderBasedOnStatus loading={loading} step={2} error={error}>
      <div className={style.offerList}>
        {offers.map((offer, index) => (
          <div className={style.offerList__item} key={index}>
            <img
              src="/images/SurpriseImage.png"
              alt="Surprise"
              className={style.offerList__img}
            />
            <OfferItem offer={offer} />
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
    </RenderBasedOnStatus>
  );
};
