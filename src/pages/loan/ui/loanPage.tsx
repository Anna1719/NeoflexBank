import { AdSection } from "../loanComponents/adSection";
import { StepsSection } from "../loanComponents/stepsSection";
import { TabSection } from "../loanComponents/tabSection";
import style from "./loanPage.module.scss";

export const LoanPage = () => {
  return (
    <div className={style.loanPage}>
      <AdSection />
      <TabSection />
      <StepsSection />
    </div>
  );
};
