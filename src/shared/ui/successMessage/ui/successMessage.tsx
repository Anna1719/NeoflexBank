import { useNavigate } from "react-router-dom";
import { ButtonMain } from "../../buttonMain";
import style from "./successMessage.module.scss";
import { clearStore } from "@/store/store";
import cn from "classnames";

type TProps = {
  title: string;
  subtitle: string;
  final?: boolean;
  border?: boolean;
};

export const SuccessMessage = ({ title, subtitle, final = false, border = false }: TProps) => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    clearStore();
    navigate("/");
  };
  return (
    <div  className={cn(style.success, border && style.success__border)}>
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
