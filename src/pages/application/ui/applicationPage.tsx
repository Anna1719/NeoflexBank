import style from "./applicationPage.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { ScoringFormData } from "@/utils/formUtils/scoringFormTypes";
import {
  formFieldsFirst,
  formFieldsSecond,
} from "@/utils/formUtils/scoringFormProps";
import { ButtonMain } from "@/shared/ui/buttonMain";
import { useAxios } from "@/shared/hooks/useAxios";
import { AxiosRequestConfig } from "axios";
import { LoanState, Offer } from "@/store/types";
import { AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { transformData } from "@/utils/formUtils/scoringFormData";
import { setCurrentStep, setStepStatus } from "@/store/actions";
import { RenderBasedOnStatus } from "@/shared/ui/renderBasedOnStatus";
import { FormFieldRenderer } from "@/shared/ui/formFieldRender/formFieldRenderer";
import { Loader } from "@/shared/ui/loader";

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

  const currentAppId = useSelector((state: LoanState) => state.applicationId);

  const { loading, error } = useAxios<Offer[]>(axiosConfig);

  const dispatch = useDispatch<AppDispatch>();

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

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <RenderBasedOnStatus step={3} error={error}>
          <section className={style.scoring}>
            <div className={style.scoring__top}>
              <h4 className={style.scoring__topTitle}>
                Continuation of the application
              </h4>
              <p className={style.scoring__topSubtitle}>Step 2 of 5</p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={style.scoring__form}
            >
              <div className={style.scoring__bottomUp}>
                {Object.keys(formFieldsFirst).map((key) => {
                  const field = formFieldsFirst[key];
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
              </div>
              <div className={style.scoring__bottomTitle}>Employment</div>
              <div className={style.scoring__bottomDown}>
                {Object.keys(formFieldsSecond).map((key) => {
                  const field = formFieldsSecond[key];
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
              </div>
              <div className={style.scoring__buttonWrapper}>
                <ButtonMain radius={8} width={148}>
                  Continue
                </ButtonMain>
              </div>
            </form>
          </section>
        </RenderBasedOnStatus>
      )}
    </>
  );
};
