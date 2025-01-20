import { StepsComponent } from "../components/steps";
import style from "./stepsSection.module.scss";
import { PrescoringForm } from "../../prescoring";
import { Offers } from "../components/offers";

type TProps = {
  step: number;
};

export const StepsSection = ({ step }: TProps) => {
  return (
    <section className={style.stepsSection}>
      <StepsComponent />
      <div id="cardForm">{step === 1 ? <PrescoringForm /> : <Offers />}</div>
    </section>
  );
};
