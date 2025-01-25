import { useEffect, useRef, useState } from "react";
import style from "./codePage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { LoanState } from "@/store/types";
import { AxiosRequestConfig } from "axios";
import { useAxios } from "@/shared/hooks/useAxios";
import { AppDispatch } from "@/store/store";
import { setStepStatus } from "@/store/actions";
import { RenderBasedOnStatus } from "@/shared/ui/renderBasedOnStatus";
import { Loader } from "@/shared/ui/loader";

const PASSWORD_LENGTH = 4;
const REG_NUMBER_CHECK = /^\d*$/;

export const CodePage = () => {
  const [values, setValues] = useState<string[]>(
    Array(PASSWORD_LENGTH).fill("")
  );
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const [axiosConfig, setAxiosConfig] = useState<AxiosRequestConfig | null>(
    null
  );

  const { loading, success, error } = useAxios(axiosConfig);

  const currentAppId = useSelector((state: LoanState) => state.applicationId);

  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (value: string, index: number) => {
    if (!REG_NUMBER_CHECK.test(value)) return;

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
    const isBackspacePressed = e.key === "Backspace";
    const isCurrentValueEmptyAndBackspace =
      !values[index] && isBackspacePressed;

    if (isCurrentValueEmptyAndBackspace && index > 0) {
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

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <RenderBasedOnStatus step={6}>
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
              <div className={style.codePage__error}>
                Invalid confirmation code
              </div>
            )}
          </section>
        </RenderBasedOnStatus>
      )}
    </>
  );
};
