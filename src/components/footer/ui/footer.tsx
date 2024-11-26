import style from "./footer.module.scss";
import { Link } from "react-router-dom";

const footerLinksConfig = [
  { id: 1, link: "#", text: "About a bank" },
  { id: 2, link: "#", text: "Ask a Question" },
  { id: 3, link: "#", text: "Quality of service" },
  { id: 4, link: "#", text: "Requisites" },
  { id: 5, link: "#", text: "Press center" },
  { id: 6, link: "#", text: "Bank career" },
  { id: 7, link: "#", text: "Investors" },
  { id: 8, link: "#", text: "Analytics" },
  { id: 9, link: "#", text: "Business and processes" },
  { id: 10, link: "#", text: "Compliance and business ethics" },
];

export const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.footer__container}>
        <div className={style.footer__top}>
          <div className={style.footer__logo}>
            <Link target="_blank" to="https://www.neoflex.ru/">
              <img
                src="/images/logos/NeoflexLogo.png"
                alt="NeoflexLogo"
                className={style.footer__logoImg}
              />
            </Link>
          </div>
          <div className={style.footer__contact}>
            <Link
              target="_blank"
              to="tel:+74959842513"
              className={style.footer__contactPhone}
            >
              +7 (495) 984 25 13
            </Link>
            <Link
              target="_blank"
              to="mailto:info@neoflex.ru"
              className={style.footer__contactMail}
            >
              info@neoflex.ru
            </Link>
          </div>
        </div>

        <ul className={style.footer__links}>
          {footerLinksConfig.map((item) => (
            <li key={item.id} className={style.footer__linkItem}>
              <a href={item.link} className={style.footer__link}>
                {item.text}
              </a>
            </li>
          ))}
        </ul>

        <span className={style.footer__separator}></span>

        <div className={style.footer__cookies}>
          <p className={style.footer__cookiesText}>
            We use cookies to personalize our services and improve the user
            experience of our website. Cookies are small files containing
            information about previous visits to a website. If you do not want
            to use cookies, please change your browser settings.
          </p>
        </div>
      </div>
    </footer>
  );
};
