import { ButtonMain } from "@/shared/ui/buttonMain";
import style from "./adSection.module.scss";
import { Tooltip } from "@/shared/ui/tooltip";

const handleScrollToId = () => {
  const element = document.getElementById("cardForm");
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

export const AdSection = () => {
  return (
    <section className={style.adSection}>
      <div className={style.adSection__wrapper}>
        <div className={style.adSection__infoWrapper}>
          <h1 className={style.adSection__title}>
            Platinum digital credit card
          </h1>
          <p className={style.adSection__subtitle}>
            Our best credit card. Suitable for everyday spending and shopping.
            Cash withdrawals and transfers without commission and interest.
          </p>
          <ul className={style.adSection__points}>
            <li className={style.adSection__pointsItem}>
              <h3 className={style.adSection__pointTitle}>Up to 160 days</h3>
              <Tooltip
                tooltipText="When repaying the full
debt up to 160 days."
              >
                <div className={style.adSection__pointSubtitle}>No percent</div>
              </Tooltip>
            </li>
            <li className={style.adSection__pointsListItem}>
              <h3 className={style.adSection__pointTitle}>Up to 600 000 ₽</h3>
              <Tooltip tooltipText="Over the limit will accrue percent.">
                <div className={style.adSection__pointSubtitle}>
                  Credit limit
                </div>
              </Tooltip>
            </li>
            <li className={style.adSection__pointsListItem}>
              <h3 className={style.adSection__pointTitle}>0 ₽</h3>
              <Tooltip tooltipText="Promotion valid until December 31, 2022.">
                <div className={style.adSection__pointSubtitle}>
                  Card service is free
                </div>
              </Tooltip>
            </li>
          </ul>
          <ButtonMain radius="8" onClick={handleScrollToId}>
            Apply for card
          </ButtonMain>
        </div>
        <div className={style.adSection__card}>
          <img
            src="/images/cardImage.png"
            alt="Card Image"
            className={style.adSection__cardPic}
          />
        </div>
      </div>
    </section>
  );
};
