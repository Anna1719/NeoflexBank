import style from "./prescoring.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
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
import { FormFieldRenderer } from "@/shared/ui/formFieldRender/formFieldRenderer";
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

  return (
    <div className={style.prescoring}>
      {loading ? (
        <Loader />
      ) : (
        <RenderBasedOnStatus step={1} error={error}>
          <PrescoringTop
            amount={amount}
            isSubmitted={isSubmitted}
            errors={errors}
            register={register}
          />
          <div className={style.prescoring__bottom}>
            <h4 className={style.prescoring__bottomTitle}>
              Contact Information
            </h4>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={style.prescoring__form}
            >
              {Object.keys(formFields).map((key) => {
                const field = formFields[key];
                return (
                  <FormFieldRenderer
                    key={key}
                    field={field}
                    errors={errors}
                    register={register}
                    isSubmitted={isSubmitted}
                  />
                );
              })}
            </form>
            <div className={style.prescoring__buttonWrapper}>
              <ButtonMain
                onClick={handleSubmit(onSubmit)}
                radius={8}
                width={148}
              >
                Continue
              </ButtonMain>
            </div>
          </div>
        </RenderBasedOnStatus>
      )}
    </div>
  );
};
