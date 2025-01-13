import style from "./prescoring.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { Select, Input } from "@/shared/ui/formFields";
import { formPrescoringData } from "@/utils/formUtils/prescoringDataReshape";
import { useEffect, useState } from "react";
import { PrescoringTop } from "../prescoringTop";
import {
  initialFormData,
  PrescopingFormData,
} from "@/utils/formUtils/prescoringFormTypes";
import { formFields } from "@/utils/formUtils/prescoringFormProps";
import { ButtonMain } from "@/shared/ui/buttonMain";
import { useAxios } from "@/shared/hooks/useAxios";
import { AxiosRequestConfig } from "axios";
import { Offer } from "@/store/types";
import {
  setApplicationId,
  setCurrentStep,
  setOffers,
  setStepStatus,
} from "@/store/actions";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { RenderBasedOnStatus } from "@/shared/ui/renderBasedOnStatus";

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
  const [axiosConfig, setAxiosConfig] = useState<AxiosRequestConfig | null>(
    null
  );
  const amount = watch("amount", initialFormData.amount);
  const { loading, data, error } = useAxios<Offer[]>(axiosConfig);
  const dispatch = useDispatch<AppDispatch>();
  const onSubmit: SubmitHandler<PrescopingFormData> = async (formData) => {
    const tunedData = formPrescoringData(formData);
    setAxiosConfig({
      method: "POST",
      url: "/application",
      data: tunedData,
    });
  };

  useEffect(() => {
    if (isSubmitSuccessful && data) {
      dispatch(setCurrentStep(2));
      dispatch(setApplicationId(data[0].applicationId));
      dispatch(setOffers(data));
      dispatch(setStepStatus(1, { status: "isSent" }));
      dispatch(setStepStatus(2, { status: "isActive" }));
      reset();
    }
  }, [isSubmitSuccessful, reset, data, dispatch]);

  // Условия рендеринга вынесены в отдельный компонент

  return (
    <div className={style.prescoring}>
      <RenderBasedOnStatus step={1} loading={loading} error={error}>
        <PrescoringTop
          amount={amount}
          isSubmitted={isSubmitted}
          errors={errors}
          register={register}
        />
        <div className={style.prescoring__bottom}>
          <h4 className={style.prescoring__bottomTitle}>Contact Information</h4>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={style.prescoring__form}
          >
            {Object.keys(formFields).map((key) => {
              // Object.entries убраны
              const field = formFields[key];
              if (field.type === "select") {
                return (
                  <Select
                    key={key}
                    req={field.req}
                    id={field.id}
                    label={field.label}
                    options={field.options}
                    error={errors[field.id]?.message}
                    register={register(field.id, field.validation)}
                  />
                );
              }
              return (
                <Input
                  sub={isSubmitted}
                  key={key}
                  req={field.req}
                  id={field.id}
                  label={field.label}
                  type={field.type}
                  placeholder={field.placeholder}
                  error={errors[field.id]?.message}
                  register={register(field.id, field.validation)}
                  formatter={field.formatter}
                />
              );
            })}
          </form>
          <div className={style.prescoring__buttonWrapper}>
            <ButtonMain onClick={handleSubmit(onSubmit)} radius={8} width={148}>
              Continue
            </ButtonMain>
          </div>
        </div>
      </RenderBasedOnStatus>
    </div>
  );
};
