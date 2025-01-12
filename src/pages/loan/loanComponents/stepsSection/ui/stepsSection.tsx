import { StepsComponent } from "../components/steps";
import style from "./stepsSection.module.scss";
import { PrescoringForm } from "../../prescoring";
import { Offers } from "../components/offers";

export const StepsSection = ( step : number) => {
  return (
    <section className={style.stepsSection}>
      <StepsComponent />
      <div id="cardForm">{step === 1 ? <PrescoringForm /> : <Offers />}</div>
    </section>
  );
};
