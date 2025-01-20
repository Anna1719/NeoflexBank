import { Divider } from "@/shared/ui/divider";
import { Input } from "@/shared/ui/formFields";
import style from "./prescoringTop.module.scss";
import {
  DividerStyleFormFirst,
  DividerStyleFormSecond,
} from "@/utils/dividerStyles";
import { PrescopingFormData, PrescopingFormFields } from "@/utils/formUtils/prescoringFormTypes";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface PrescoringTopProps {
  amount: number;
  isSubmitted: boolean;
  errors: FieldErrors<PrescopingFormData>;
  register: UseFormRegister<PrescopingFormData>;
}
// Числа вынесены в константы
const MIN_CREDIT_AMOUNT = 150000;
const MAX_CREDIT_AMOUNT = 600000;

export const PrescoringTop: React.FC<PrescoringTopProps> = ({
  amount,
  isSubmitted,
  errors,
  register,
}) => {
  return (
    <div className={style.top}>
      <div className={style.top__header}>
        <div className={style.top__titleWrapper}>
          <h2 className={style.top__title}>Customize your card</h2>
          <div className={style.top__subtitle}>Step 1 of 5</div>
        </div>
        <div className={style.top__amount}>
          <h4 className={style.top__amountTitle}>Select amount</h4>
          <div className={style.top__amountContent}>
            <b className={style.top__price}>{amount.toLocaleString("ru")}</b>
          </div>
          <Input
            sub={isSubmitted}
            id={PrescopingFormFields.amount}
            label=""
            type="number"
            error={errors[PrescopingFormFields.amount]?.message}
            register={register(PrescopingFormFields.amount, {
              required: "Choose the amount",
              min: {
                value: MIN_CREDIT_AMOUNT,
                message: "Amount cannot be lower than " + MIN_CREDIT_AMOUNT.toLocaleString("ru"),
              },
              max: {
                value: MAX_CREDIT_AMOUNT,
                message: "Amount cannot be higher than " + MAX_CREDIT_AMOUNT.toLocaleString("ru"),
              },
            })}
          />
          <div className={style.top__inputSubWrapper}>
            <span className={style.top__inputSubtext}>{MIN_CREDIT_AMOUNT.toLocaleString("ru")}</span>
            <span className={style.top__inputSubtext}>{MAX_CREDIT_AMOUNT.toLocaleString("ru")}</span>
          </div>
        </div>
      </div>
      <Divider {...DividerStyleFormFirst} />
      <div className={style.top__chosenAmount}>
        <h4 className={style.top__chosenAmountTitle}>
          You have chosen the amount
        </h4>
        <b className={style.top__chosenPrice}>
          {amount.toLocaleString("ru")} ₽
        </b>
        <Divider {...DividerStyleFormSecond} />
      </div>
    </div>
  );
};
