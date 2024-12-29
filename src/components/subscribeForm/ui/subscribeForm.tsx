import { useState, useEffect } from "react";
import style from "./subscribeForm.module.scss";
import { SendEmail, EmailLogo } from "@/icons";
import { getSubscribeConfig, SubscribeResponse } from "../api/getSubscribeConfig";
import { useAxios } from "@/shared/hooks/useAxios";

export const SubscribeForm = () => {
  const [email, setEmail] = useState<string>("");
  const [isSubscribed, setIsSubscribed] = useState<boolean>(() => {
    return localStorage.getItem("isSubscribed") === "true";
  });

  const [axiosConfig, setAxiosConfig] = useState<null | ReturnType<
    typeof getSubscribeConfig
  >>(null);
  
  const { loading, error, data } = useAxios<SubscribeResponse>(axiosConfig);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setAxiosConfig(getSubscribeConfig(email));
  };

  useEffect(() => {
    if (data) {
      setIsSubscribed(true);
      localStorage.setItem("isSubscribed", "true");
    }
  }, [data]);

  return isSubscribed ? (
    <div className={style.subscribeForm__message}>
      You are already subscribed to the bank's newsletter.
    </div>
  ) : (
    <form className={style.subscribeForm} onSubmit={handleSubmit} noValidate>
      <div className={style.subscribeForm__inputField}>
        <EmailLogo />
        <input
          type="email"
          placeholder="Your email"
          className={style.subscribeForm__input}
          value={email}
          onChange={handleInputChange}
        />
      </div>
      {error && (
        <span className={style.subscribeForm__error}>
          {error.message || "Something went wrong. Try again later."}
        </span>
      )}
      <button
        className={style.subscribeForm__button}
        type="submit"
        disabled={loading}
      >
        <SendEmail />
        <span className={style.subscribeForm__buttonText}>Subscribe</span>
      </button>
    </form>
  );
};
