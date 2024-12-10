import { HeroSection } from "../homeComponents/heroSection";
import { ServicesSection } from "../homeComponents/servicesSection";
import style from "./home.module.scss";
import { CurrencyRates } from "@/features/currencyConverter";
import { SubscribeForm } from "@/components/subscribeForm";
import { NewsSlider } from "@/features/newsSlider";

export function HomePage() {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <CurrencyRates />
      <section className={style.mapSection}>
        <h2 className={style.mapSection__header}>
          You can use our services anywhere in the world
        </h2>
        <p className={style.mapSection__info}>
          Withdraw and transfer money online through our application
        </p>
        <img
          src="/images/Map.png"
          alt="World Map"
          className={style.mapSection__image}
        />
      </section>
      <NewsSlider />
      <section className={style.subscribeSection}>
        <a href="#" className={style.subscribeSection__link}>
          Support
        </a>
        <h3 className={style.subscribeSection__titleFirst}>
          Subscribe Newsletter & get
        </h3>
        <h3 className={style.subscribeSection__titleSecond}>Bank News</h3>
        <SubscribeForm />
      </section>
    </div>
  );
}
