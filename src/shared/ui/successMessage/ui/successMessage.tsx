import { useNavigate } from "react-router-dom";
import { ButtonMain } from "../../buttonMain";
import style from "./successMessage.module.scss";
import { clearStore } from "@/store/store";

type TProps = {
  title: string;
  subtitle: string;
  final?: boolean;
};

export const SuccessMessage = ({ title, subtitle, final = false }: TProps) => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    clearStore();
    navigate("/");
  };
  return (
    <div className={style.success}>
      {final && <img src="/images/SurpriseImage.png" alt="Surprise" />}
      <h2 className={style.success__title}>{title}</h2>
      <p className={style.success__subtitle}>{subtitle}</p>
      {final && (
        <div className={style.success__button}>
          <ButtonMain onClick={handleGoHome}>
            View other offers of our bank
          </ButtonMain>
        </div>
      )}
    </div>
  );
};
