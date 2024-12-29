import { Divider } from "@/shared/ui/divider";
import { Input } from "@/shared/ui/formFields";
import style from "./prescoringTop.module.scss";
import {
  DividerStyleFormFirst,
  DividerStyleFormSecond,
} from "@/utils/dividerStyles";
import { PrescopingFormData, PrescopingFormFields } from "@/utils/formTypes";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface PrescoringTopProps {
  amount: number;
  isSubmitted: boolean;
  errors: FieldErrors<PrescopingFormData>;
  register: UseFormRegister<PrescopingFormData>;
}

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
                value: 15000,
                message: "Amount cannot be lower than 15 000",
              },
              max: {
                value: 600000,
                message: "Amount cannot be higher than 600 000",
              },
            })}
          />
          <div className={style.top__inputSubWrapper}>
            <span className={style.top__inputSubtext}>150 00</span>
            <span className={style.top__inputSubtext}>600 000</span>
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
