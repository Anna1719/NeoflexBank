import { useEffect, useRef, useState } from "react";
import style from "./codePage.module.scss";
import { useValidateApplicationId } from "@/shared/hooks/useValidateApplicationId";
import { useDispatch, useSelector } from "react-redux";
import { LoanState } from "@/store/types";
import { AxiosRequestConfig } from "axios";
import { useAxios } from "@/shared/hooks/useAxios";
import { AppDispatch } from "@/store/store";
import { setStepStatus } from "@/store/actions";
import { Loader } from "@/shared/ui/loader";
import { SuccessMessage } from "@/shared/ui/successMessage";

export const CodePage = () => {
  useValidateApplicationId();
  const PASSWORD_LENGTH = 4;
  const [values, setValues] = useState<string[]>(
    Array(PASSWORD_LENGTH).fill("")
  );
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const [axiosConfig, setAxiosConfig] = useState<AxiosRequestConfig | null>(
    null
  );

  const { loading, success, error } = useAxios(axiosConfig);

  const currentAppId = useSelector((state: LoanState) => state.applicationId);
  const stepStatus = useSelector(
    (state: LoanState) => state.applicationData[6]?.status
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    if (value && index < PASSWORD_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleSend = () => {
    const combinedValue = Number(values.join(""));
    setAxiosConfig({
      method: "POST",
      url: `/document/${currentAppId}/sign/code`,
      data: combinedValue,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      const newValues = [...values];
      newValues[index - 1] = "";
      setValues(newValues);
      inputsRef.current[index - 1]?.focus();
    }

    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handlePaste =
    (currentIndex: number) => (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasteData = e.clipboardData.getData("text").replace(/\D/g, "");
      if (!pasteData) return;
      const newValues = [...values];
      let pasteIndex = 0;

      for (
        let i = currentIndex;
        i < PASSWORD_LENGTH && pasteIndex < pasteData.length;
        i++
      ) {
        newValues[i] = pasteData[pasteIndex];
        pasteIndex++;
      }

      setValues(newValues);
      const nextIndex = Math.min(
        currentIndex + pasteData.length,
        PASSWORD_LENGTH - 1
      );
      inputsRef.current[nextIndex]?.focus();
    };

  useEffect(() => {
    if (success) {
      dispatch(setStepStatus(6, { status: "isSent" }));
    }
  }, [success, dispatch]);

  if (loading) {
    return (
      <div className={style.codePage}>
        <div className={style.codePage__loaderCenter}>
          <Loader />
        </div>
      </div>
    );
  }

  return stepStatus === "isSent" ? (
    <SuccessMessage
      final={true}
      title="Congratulations! You have completed your new credit card."
      subtitle="Your credit card will arrive soon. Thank you for choosing us!"
    />
  ) : (
    <section className={style.codePage}>
      <label className={style.codePage__label}>
        Please enter confirmation code
      </label>
      <div className={style.codePage__codeWrapper}>
        {values.map((value, index) => (
          <div key={index} className={style.codePage__inputWrapper}>
            <input
              ref={(el) => (inputsRef.current[index] = el!)}
              type="text"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste(index)}
              className={style.codePage__input}
            />
            {!value && <div className={style.codePage__circle}></div>}
          </div>
        ))}
      </div>
      {error && (
        <div className={style.codePage__error}>Invalid confirmation code</div>
      )}
    </section>
  );
};
