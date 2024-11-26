import { ButtonMain } from "@/shared/ui/buttonMain";
import { Link } from "react-router";
import { ROUTES } from "@/app/routes";
import { cardImages } from "@/utils/cardImageDdata";
import style from "./heroSection.module.scss";

export const HeroSection = () => {
  return (
    <section className={style.hero}>
      <div className={style.hero__titleContent}>
        <h1>Choose the design you like and apply for card right now</h1>
        <Link to={ROUTES.CREDIT} className={style.hero__button}>
          <ButtonMain text="Choose the card" radius={16} />
        </Link>
      </div>
      <div className={style.hero__images}>
        {cardImages.map((pic) => (
          <img src={pic.img} alt={pic.alt} className={style.hero__image} />
        ))}
      </div>
    </section>
  );
};
