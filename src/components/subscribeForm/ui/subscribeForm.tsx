import style from "./subscribeForm.module.scss";
import { SendEmail, EmailLogo } from "@/icons";

export const SubscribeForm = () => {
  return (
    <div className={style.subscribeForm}>
      <div className={style.subscribeForm__inputField}>
        <EmailLogo />
        <input
          type="email"
          placeholder="Your email"
          className={style.subscribeForm__input}
        />
      </div>
      <button className={style.subscribeForm__button}>
        <SendEmail />
        <span>Subscribe</span>
      </button>
    </div>
  );
};
