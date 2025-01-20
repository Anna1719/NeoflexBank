import { AdSection } from "../loanComponents/adSection";
import { StepsSection } from "../loanComponents/stepsSection";
import { TabSection } from "../loanComponents/tabSection";
import { useSelector } from "react-redux";
import { LoanState } from "@/store/types";
import style from "./loanPage.module.scss";

export const LoanPage = () => {

  const currentStep = useSelector((state : LoanState) => state.currentStep);

  return (
    <div className={style.loanPage}>
      <AdSection step={currentStep}/>
      <TabSection />
      <StepsSection step={currentStep}/>
    </div>
  );
};
