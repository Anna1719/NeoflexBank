import style from "./servicesSection.module.scss";
import { Checkmark } from "@/icons";

const benefits = [
  { id: 1, text: "Powerful online protection." },
  { id: 2, text: "Cashback without borders." },
  { id: 3, text: "Personal design." },
  { id: 4, text: "Work anywhere in the world." },
];

export const ServicesSection = () => {
  return (
    <section className={style.services}>
      <div className={style.services__imageWrapper}>
        <img
          src="/images/HomepageImage.png"
          alt="Homepage Image"
          className={style.services__image}
        />
      </div>
      <div className={style.services__infoWrapper}>
        <h2>
          We Provide Many Features You Can Use
        </h2>
        <p>
          You can explore the features that we provide with fun and have their
          own functions each feature
        </p>
        <ul className={style.services__benefitsList}>
          {benefits.map((benefit) => (
            <li key={benefit.id} className={style.services__benefit}>
              <Checkmark />
              <span className={style.services__listItem}>{benefit.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
