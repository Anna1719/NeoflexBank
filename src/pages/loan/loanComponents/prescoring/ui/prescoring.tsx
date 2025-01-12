import style from "./prescoring.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { Select, Input } from "@/shared/ui/formFields";
import { formPrescoringData } from "@/utils/formPrescoringData";
import { useEffect, useState } from "react";
import { PrescoringTop } from "../components";
import { initialFormData, PrescopingFormData } from "@/utils/formTypes";
import { formFields } from "@/utils/prescoringFormProps";
import { ButtonMain } from "@/shared/ui/buttonMain";
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
              />
            );
          })}
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
