import { Link } from "react-router-dom";
import { ROUTES } from "@/app/routes";
import { ButtonMain } from "@/shared/ui/buttonMain";
import style from "./header.module.scss";

const routeConfig = [
  { id: 1, title: "Credit card", link: ROUTES.CREDIT },
  { id: 2, title: "Product", link: ROUTES.PRODUCT },
  { id: 3, title: "Account", link: ROUTES.ACCOUNT },
  { id: 4, title: "Resources", link: ROUTES.RESOURSES },
];

export const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.header__container}>
        <Link className={style.header__logo} to={ROUTES.HOME}>
          NeoBank
        </Link>
        <nav className={style.header__nav}>
          <ul className={style.header__navlist}>
            {routeConfig.map((route) => (
              <li key={route.id} className={style.header__naviItem}>
                <Link to={route.link} className={style.header__navItemLink}>
                  {route.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={style.header__button}>
          <ButtonMain type="button" radius="16">
            Online Bank
          </ButtonMain>
        </div>
      </div>
    </header>
  );
};
