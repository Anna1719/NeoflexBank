import { useState, useEffect, useRef } from "react";
import style from "./newsSlider.module.scss";
import { ButtonLeft} from "@/icons/ButtonLeft";
import { NewsList } from "../api/newsRequest";
import { ButtonRight } from "@/icons/ButtonRight";

const SCROLL_STEP = 500;
const NEWS_NUMBER = 20;

export const NewsSlider = () => {
  const [currentOffset, setCurrentOffset] = useState(0);
  const [rightButtonDisabled, setRightButtonDisabled] = useState(false);
  const [leftButtonDisabled, setLeftButtonDisabled] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const news = NewsList(NEWS_NUMBER);

  const getMaxOffset = (): number => {
    const track = trackRef.current;
    if (!track) return 0;

    return track.scrollWidth - track.clientWidth;
  };

  useEffect (() => {
    setLeftButtonDisabled(currentOffset <= 0 ? true : false);
    setRightButtonDisabled(currentOffset >= getMaxOffset() ? true : false);
  }, [currentOffset, news]);

  const updateSliderPosition = (newOffset: number) => {
    setCurrentOffset(newOffset);
  };

  const handleNext = () => {
    const maxOffset = getMaxOffset();
    if (currentOffset < maxOffset) {
      updateSliderPosition(Math.min(currentOffset + SCROLL_STEP, maxOffset));
    }
  };

  const handlePrev = () => {
    if (currentOffset > 0) {
      updateSliderPosition(currentOffset >= SCROLL_STEP ? currentOffset - SCROLL_STEP : 0);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;

    if (swipeDistance > 50) {
      handleNext();
    } else if (swipeDistance < -50) {
      handlePrev();
    }
  };

  return (
    <section className={style.newsSlider}>
      <h2 className={style.newsSlider__title}>
        Current news from the world of Finance
      </h2>
      <p className={style.newsSlider__subtitle}>
        We update the news feed every 15 minutes. You can learn more by clicking
        on the news you are interested in.
      </p>
      <div className={style.newsSlider__slider}>
        <div
          className={style.newsSlider__sliderGallery}
          ref={trackRef}
          style={{
            transform: `translateX(-${currentOffset}px)`,
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {news.map((article, index) => (
            <div key={index} className={style.newsSlider__card}>
              <img
                src={article.urlToImage}
                alt={article.title}
                className={style.newsSlider__cardImage}
              />
              <h3 className={style.newsSlider__cardTitle}>
                <a
                  className={style.newsSlider__cardLink}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {article.title}
                </a>
              </h3>
              <p className={style.newsSlider__cardDescription}>
                {article.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className={style.newsSlider__buttons}>
        <button
          className={style.newsSlider__buttonSlide}
          onClick={handlePrev}
          disabled={leftButtonDisabled}
        >
          <ButtonLeft />
        </button>
        <button
          className={style.newsSlider__buttonSlide}
          onClick={handleNext}
          disabled={rightButtonDisabled}
        >
          <ButtonRight />
        </button>
      </div>
    </section>
  );
};
