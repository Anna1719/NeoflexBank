import { useNavigate } from "react-router-dom";
import { ButtonMain } from "../../buttonMain";
import style from "./errorMessage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, clearStore } from "@/store/store";
import { setCurrentStep, setStepStatus } from "@/store/actions";
import { LoanState } from "@/store/types";

export const ErrorMessage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const currentStep = useSelector((state: LoanState) => state.currentStep);
  const applicationData = useSelector(
    (state: LoanState) => state.applicationData
  );

  const handleGoBack = () => {
    if (currentStep !== 1) {
      Object.keys(applicationData).forEach((step) => {
        const currStep = Number(step);
        dispatch(setStepStatus(currStep, { status: "isStepNotActive" }));
      });

      dispatch(setCurrentStep(2));
      dispatch(setStepStatus(1, { status: "isSent" }));
      dispatch(setStepStatus(2, { status: "isActive" }));
    } else {
      clearStore();
    }
    navigate("/loan");
  };
  return (
    <div className={style.error}>
      <h2 className={style.error__title}>
        Oops! It seems server error has occured...
      </h2>
      <p className={style.success__subtitle}>
        We suggest to go back. Sorry for the inconvenience.
      </p>
      <div className={style.success__button}>
        <ButtonMain onClick={handleGoBack}>
          View other offers of our bank
        </ButtonMain>
      </div>
    </div>
  );
};
