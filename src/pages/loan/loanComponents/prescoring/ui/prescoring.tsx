import style from "./prescoring.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { Select } from "@/shared/ui/formFields/select";
import { Input } from "@/shared/ui/formFields/input";
import { validateDate } from "@/utils/validateDate";
import { formPrescoringData } from "@/utils/formPrescoringData";
import { useEffect } from "react";
import {
  DividerStyleFormFirst,
  DividerStyleFormSecond,
} from "@/utils/dividerStyles";
import { Divider } from "@/shared/ui/divider";
import {
  initialFormData,
  termOptions,
  PrescopingFormData,
  PrescopingFormFields,
} from "@/utils/formTypes";
import { ButtonMain } from "@/shared/ui/buttonMain";
import { useState } from "react";
import { useAxios } from "@/shared/hooks/useAxios";
import { AxiosRequestConfig } from "axios";
import { Loader } from "@/shared/ui/loader";

export const PrescoringForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted, isSubmitSuccessful },
  } = useForm<PrescopingFormData>({
    defaultValues: initialFormData,
  });

  const amount = watch("amount", initialFormData.amount);

  const [axiosConfig, setAxiosConfig] = useState<AxiosRequestConfig | null>(
    null
  );

  const onSubmit: SubmitHandler<PrescopingFormData> = async (data) => {
    const tunedData = formPrescoringData(data);
    setAxiosConfig({
      method: "POST",
      url: "/application",
      data: tunedData,
    });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const { loading } = useAxios(axiosConfig);

  return loading ? (
    <div className={style.prescoring}>
      <div className={style.prescoring__loaderCenter}>
        <Loader />
      </div>
    </div>
  ) : (
    <div className={style.prescoring}>
      <div className={style.prescoring__top}>
        <div className={style.prescoring__header}>
          <div className={style.prescoring__titleWrapper}>
            <h2 className={style.prescoring__title}>Customize your card</h2>
            <div className={style.prescoring__subtitle}>Step 1 of 5</div>
          </div>
          <div className={style.prescoring__amount}>
            <h4 className={style.prescoring__amountTitle}>Select amount</h4>
            <div className={style.prescoring__amountContent}>
              <b className={style.prescoring__price}>
                {amount.toLocaleString("ru")}
              </b>
            </div>
            <Input
              sub={isSubmitted}
              id={PrescopingFormFields.amount}
              label=""
              type="number"
              error={errors.amount?.message}
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
            <div className={style.prescoring__inputSubWrapper}>
              <span className={style.prescoring__inputSubtext}>150 00</span>
              <span className={style.prescoring__inputSubtext}>600 000</span>
            </div>
          </div>
        </div>
        <Divider
          width={DividerStyleFormFirst.width}
          height={DividerStyleFormFirst.height}
          position={DividerStyleFormFirst.position}
          borderTop={DividerStyleFormFirst.borderTop}
          transform={DividerStyleFormFirst.transform}
          right={DividerStyleFormFirst.right}
          top={DividerStyleFormFirst.top}
        />
        <div className={style.prescoring__chosenAmount}>
          <h4 className={style.prescoring__chosenAmountTitle}>
            You have chosen the amount
          </h4>
          <b className={style.prescoring__chosenPrice}>
            {amount.toLocaleString("ru")} ₽
          </b>
          <Divider
            width={DividerStyleFormSecond.width}
            position={DividerStyleFormSecond.position}
            borderTop={DividerStyleFormSecond.borderTop}
            left={DividerStyleFormSecond.left}
            top={DividerStyleFormSecond.top}
          />
        </div>
      </div>
      <div className={style.prescoring__bottom}>
        <h4 className={style.prescoring__bottomTitle}>Contact Information</h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={style.prescoring__form}
        >
          <Input
            sub={isSubmitted}
            id={PrescopingFormFields.lastName}
            req={true}
            type="text"
            label="Your last name"
            placeholder="For Example Doe"
            error={errors.lastName?.message}
            register={register(PrescopingFormFields.lastName, {
              required: "Enter your last name",
              minLength: { value: 2, message: "Must be at least 2 digits" },
            })}
          />
          <Input
            sub={isSubmitted}
            id={PrescopingFormFields.firstName}
            type="text"
            req={true}
            label="Your first name"
            placeholder="For Example John"
            error={errors.firstName?.message}
            register={register(PrescopingFormFields.firstName, {
              required: "Enter your first name",
              minLength: { value: 2, message: "Must be at least 2 digits" },
            })}
          />
          <Input
            sub={isSubmitted}
            id={PrescopingFormFields.middleName}
            type="text"
            label="Your patronymic"
            placeholder="For Example Victorovich"
            error={errors.middleName?.message}
            register={register(PrescopingFormFields.middleName)}
          />
          <Select
            id={PrescopingFormFields.term}
            label="Select term"
            req={true}
            error={errors.term?.message}
            options={termOptions}
            register={register(PrescopingFormFields.term, {
              required: "Choose the term",
            })}
          />
          <Input
            sub={isSubmitted}
            id={PrescopingFormFields.email}
            label="Your email"
            type="email"
            req={true}
            placeholder="example@mail.com"
            error={errors.email?.message}
            register={register(PrescopingFormFields.email, {
              required: "Enter your email address",
              pattern: {
                value: /^[\w-.]{2,}@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
                message: "Incorrect email address",
              },
            })}
          />
          <Input
            sub={isSubmitted}
            id={PrescopingFormFields.birthdate}
            label="Your date of birth"
            type="text"
            req={true}
            placeholder="YYYY-MM-DD"
            error={errors.birthdate?.message}
            register={register(PrescopingFormFields.birthdate, {
              required: "Enter your date of birth",
              validate: validateDate,
            })}
          />
          <Input
            sub={isSubmitted}
            id={PrescopingFormFields.passportSeries}
            label="Your passport series"
            placeholder="0000"
            type="number"
            req={true}
            error={errors.passportSeries?.message}
            register={register("passportSeries", {
              required: "Enter your passport series",
              pattern: {
                value: /^\d{4}$/,
                message: "The series must be 4 digits",
              },
            })}
          />
          <Input
            sub={isSubmitted}
            id={PrescopingFormFields.passportNumber}
            label="Your passport number"
            type="number"
            req={true}
            placeholder="000000"
            error={errors.passportNumber?.message}
            register={register(PrescopingFormFields.passportNumber, {
              required: "Enter your passport number",
              pattern: {
                value: /^\d{6}$/,
                message: "The series must be 6 digits",
              },
            })}
          />
          <div className={style.prescoring__buttonWrapper}>
            <ButtonMain radius="8" width="148">
              Continue
            </ButtonMain>
          </div>
        </form>
      </div>
    </div>
  );
};
