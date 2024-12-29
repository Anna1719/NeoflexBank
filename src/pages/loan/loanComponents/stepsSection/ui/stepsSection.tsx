import { StepsComponent } from "../components/steps";
import style from "./stepsSection.module.scss";
import { PrescoringForm } from "../../prescoring";

export const StepsSection = () => {
  return (
    <section className={style.stepsSection}>
      <StepsComponent />
      <div id="cardForm">
        <PrescoringForm />
      </div>
    </section>
  );
};
