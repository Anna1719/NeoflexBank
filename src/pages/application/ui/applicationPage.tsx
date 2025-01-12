import style from "./applicationPage.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { Select, Input } from "@/shared/ui/formFields";
import { useEffect, useState } from "react";
import { ScoringFormData } from "@/utils/formUtils/scoringFormTypes";
import {
  formFieldsFirst,
  formFieldsSecond,
} from "@/utils/formUtils/scoringFormProps";
import { ButtonMain } from "@/shared/ui/buttonMain";
import { useAxios } from "@/shared/hooks/useAxios";
import { AxiosRequestConfig } from "axios";
import { Loader } from "@/shared/ui/loader";
import { LoanState, Offer } from "@/store/types";
import { AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { transformData } from "@/utils/formUtils/scoringFormData";
import { setCurrentStep, setStepStatus } from "@/store/actions";
import { SuccessMessage } from "@/shared/ui/successMessage";

export const ApplicationForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted, isSubmitSuccessful },
  } = useForm<ScoringFormData>({});

  const [axiosConfig, setAxiosConfig] = useState<AxiosRequestConfig | null>(
    null
  );

  const { loading } = useAxios<Offer[]>(axiosConfig);

  const dispatch = useDispatch<AppDispatch>();

  const currentAppId = useSelector((state: LoanState) => state.applicationId);
  const stepStatus = useSelector(
    (state: LoanState) => state.applicationData[3]?.status
  );

  const onSubmit: SubmitHandler<ScoringFormData> = async (formData) => {
    const reshapedData = transformData(formData);
    setAxiosConfig({
      method: "PUT",
      url: `/application/registration/${currentAppId}`,
      data: reshapedData,
    });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      dispatch(setCurrentStep(4));
      dispatch(setStepStatus(3, { status: "isSent" }));
      dispatch(setStepStatus(4, { status: "isActive" }));
      reset();
    }
  }, [isSubmitSuccessful, reset, dispatch]);

  if (loading) {
    return (
      <div className={style.scoring}>
        <div className={style.scoring__loaderCenter}>
          <Loader />
        </div>
      </div>
    );
  }

  return stepStatus === "isSent" ? (
    <SuccessMessage
      title="Wait for a decision on the application"
      subtitle="The answer will come to your mail within 10 minutes"
    />
  ) : (
    <div className={style.scoring}>
      <div className={style.scoring__top}>
        <h4 className={style.scoring__topTitle}>
          Continuation of the application
        </h4>
        <p className={style.scoring__topSubtitle}>Step 2 of 5</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={style.scoring__form}>
        <div className={style.scoring__bottomUp}>
          {Object.entries(formFieldsFirst).map(([key, field]) => {
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
        </div>
        <div className={style.scoring__bottomTitle}>Employment</div>
        <div className={style.scoring__bottomDown}>
          {Object.entries(formFieldsSecond).map(([key, field]) => {
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
        </div>
        <div className={style.scoring__buttonWrapper}>
          <ButtonMain radius={8} width={148}>
            Continue
          </ButtonMain>
        </div>
      </form>
    </div>
  );
};
