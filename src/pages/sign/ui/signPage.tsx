import { useEffect, useState } from "react";
import style from "./signPage.module.scss";
import { useValidateApplicationId } from "@/shared/hooks/useValidateApplicationId";
import { AxiosRequestConfig } from "axios";
import { useAxios } from "@/shared/hooks/useAxios";
import { Loader } from "@/shared/ui/loader";
import { LoanState } from "@/store/types";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "@/shared/ui/checkbox";
import { ButtonMain } from "@/shared/ui/buttonMain";
import { setCurrentStep, setStepStatus } from "@/store/actions";
import { AppDispatch } from "@/store/store";
import { FileDock } from "@/icons";
import { SuccessMessage } from "@/shared/ui/successMessage";

export const SignPage = () => {
  useValidateApplicationId();
  const currentAppId = useSelector((state: LoanState) => state.applicationId);
  const [isChecked, setIsChecked] = useState(false);
  const [axiosConfig, setAxiosConfig] = useState<AxiosRequestConfig | null>(
    null
  );
  const stepStatus = useSelector(
    (state: LoanState) => state.applicationData[5]?.status
  );

  const dispatch = useDispatch<AppDispatch>();

  const { loading, success } = useAxios(axiosConfig);

  const handleSend = () => {
    setAxiosConfig({ method: "POST", url: `/document/${currentAppId}/sign` });
  };

  useEffect(() => {
    if (success) {
      dispatch(setCurrentStep(6));
      dispatch(setStepStatus(5, { status: "isSent" }));
      dispatch(setStepStatus(6, { status: "isActive" }));
    }
  }, [success, dispatch]);

  if (loading) {
    return (
      <div className={style.signPage}>
        <div className={style.signPage__loaderCenter}>
          <Loader />
        </div>
      </div>
    );
  }

  return stepStatus === "isSent" ? (
    <SuccessMessage
      title="Documents have been successfully signed and sent for approval"
      subtitle="Within 10 minutes you will be sent a PIN code to your email for confirmation"
    />
  ) : (
    <section className={style.signPage}>
      <div className={style.signPage__top}>
        <h2 className={style.signPage__title}>Information on your card</h2>
        <p className={style.signPage__subtitle}>Step 4 of 5</p>
      </div>
      <p className={style.signPage__text}>
        Information on interest rates under bank deposit agreements with
        individuals. Center for Corporate Information Disclosure. Information of
        a professional participant in the securities market. Information about
        persons under whose control or significant influence the Partner Banks
        are. By leaving an application, you agree to the processing of personal
        data, obtaining information, obtaining access to a credit history, using
        an analogue of a handwritten signature, an offer, a policy regarding the
        processing of personal data, a form of consent to the processing of
        personal data.
      </p>
      <div className={style.signPage__link}>
        <a
          href="/credit-card-offer.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FileDock />
        </a>
        <p className={style.signPage__linkInfo}>Information on your card</p>
      </div>
      <div className={style.signPage__bottom}>
        <Checkbox
          id="documentAgree"
          label="I agree"
          checked={isChecked}
          onChange={setIsChecked}
        />
        <ButtonMain
          radius={8}
          height={40}
          width={160}
          disabled={!isChecked}
          onClick={handleSend}
        >
          Send
        </ButtonMain>
      </div>
    </section>
  );
};
