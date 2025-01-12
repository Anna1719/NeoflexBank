import style from "./prescoring.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { Select, Input } from "@/shared/ui/formFields";
import { formPrescoringData } from "@/utils/formUtils/prescoringFormData";
import { useEffect, useState } from "react";
import { PrescoringTop } from "../components";
import { initialFormData, PrescopingFormData } from "@/utils/formUtils/prescoringFormTypes";
import { formFields } from "@/utils/formUtils/prescoringFormProps";
import { ButtonMain } from "@/shared/ui/buttonMain";
import { useAxios } from "@/shared/hooks/useAxios";
import { AxiosRequestConfig } from "axios";
import { Loader } from "@/shared/ui/loader";
import { Offer } from "@/store/types";
import { setApplicationId, setCurrentStep, setOffers, setStepStatus } from "@/store/actions";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";

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

  const { loading, data } = useAxios<Offer[]>(axiosConfig);

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

  return loading ? (
    <div className={style.prescoring}>
      <div className={style.prescoring__loaderCenter}>
        <Loader />
      </div>
    </div>
  ) : (
    <div className={style.prescoring}>
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
          {Object.entries(formFields).map(([key, field]) => {
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
          <div className={style.prescoring__buttonWrapper}>
            <ButtonMain radius={8} width={148}>
              Continue
            </ButtonMain>
          </div>
        </form>
      </div>
    </div>
  );
};
