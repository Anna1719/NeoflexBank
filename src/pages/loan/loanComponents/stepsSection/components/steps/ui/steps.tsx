import style from "./steps.module.scss";
import { Divider } from "@/shared/ui/divider";
import { DividerStyleSteps } from "@/utils/dividerStyles";
import {
  stepsProps as steps,
  stepsArrWidth as arrWidth,
} from "@/utils/stepSectionProps"; // Вынесла в отдельный файл

export const StepsComponent = () => {
  return (
    <div className={style.steps}>
      <h2 className={style.steps__title}>How to get a card</h2>
      <ul className={style.steps__list}>
        {steps.map((step) => (
          <li key={step.id} className={style.steps__listItem}>
            <div className={style.steps__picWrapper}>
              <div className={style.steps__numberWrapper}>
                <div className={style.steps__number}>{step.number}</div>
                <Divider
                  width={arrWidth[step.id].width}
                  borderTop={DividerStyleSteps.borderTop}
                  position={DividerStyleSteps.position}
                  top={DividerStyleSteps.top}
                  left={DividerStyleSteps.left}
                />
              </div>
            </div>
            <p className={style.steps__text}>{step.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
