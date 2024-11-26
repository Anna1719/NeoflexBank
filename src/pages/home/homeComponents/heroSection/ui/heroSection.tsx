import { ButtonMain } from "@/shared/ui/buttonMain";
import { Link } from "react-router-dom";
import { ROUTES } from "@/app/routes";
import { cardImages } from "@/utils/cardImageDdata";
import style from "./heroSection.module.scss";

export const HeroSection = () => {
  return (
    <section className={style.hero}>
      <div className={style.hero__titleContent}>
        <h1 className={style.hero__title}>
          Choose the design you like and apply for card right now
        </h1>
        <Link to={ROUTES.CREDIT} className={style.hero__button}>
          <ButtonMain type="button" radius={"16"}>
            Choose the card
          </ButtonMain>
        </Link>
      </div>
      <ul className={style.hero__images}>
        {cardImages.map((pic) => (
          <li key={pic.id} className={style.hero__listItem}>
            <img src={pic.img} alt={pic.alt} className={style.hero__image} />
          </li>
        ))}
      </ul>
    </section>
  );
};
