import style from "./steps.module.scss";
import { Divider } from "@/shared/ui/divider";
import { DividerStyleSteps } from "@/utils/dividerStyles";

const steps = [
  {
    id: 0,
    number: "1",
    text: "Fill out an online application - you do not need to visit the bank",
  },
  {
    id: 1,
    number: "2",
    text: "Find out the bank's decision immediately after filling out the application",
  },
  {
    id: 2,
    number: "3",
    text: "The bank will deliver the card free of charge, wherever convenient, to your city",
  },
];

const arrWidth: React.CSSProperties[] = [
  { width: "250px" },
  { width: "292px" },
  { width: "335px" },
];

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
