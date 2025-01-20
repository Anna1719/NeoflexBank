import { ButtonMain } from "@/shared/ui/buttonMain";
import style from "./notFound.module.scss";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate("/");
    }
  };

  return (
    <section className={style.notFound}>
      <div className={style.notFound__right}>
        <h2 className={style.notFound__titleFirst}>Oops....</h2>
        <h3 className={style.notFound__titleSecond}>Page not found</h3>
        <p className={style.notFound__subtitle}>
          This page doesn`t exist or was removed! We suggest you go back.
        </p>
        <ButtonMain radius={8} width={192} height={40} onClick={handleGoBack}>
          Go Back
        </ButtonMain>
      </div>
      <img className={style.notFound__image} src="/images/404Error.png" alt="404 Error" />
    </section>
  );
};
