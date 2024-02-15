import { useRecoilValue } from 'recoil';
import { Pagination, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import SliderItem from '@/components/SliderItem';
import { allArticlesState } from '@/globalStates/allArticlesState';

const SpSlider = () => {
  const allArticles = useRecoilValue(allArticlesState);

  // timelineOnly が false のものだけを取り出し、さらに先頭の9件を取り出す
  const displayArticles = allArticles
    .filter((article) => article.timelineOnly === false)
    .slice(0, 9);

  return (
    <Swiper
      modules={[Pagination, A11y, Autoplay]}
      spaceBetween={20}
      className="max-w-full pb-14"
      pagination={{
        clickable: true,
        horizontalClass: 'swiper-pagination-horizontal',
        bulletClass: 'swiper-pagination-bullet slider-dot',
        bulletActiveClass: 'swiper-pagination-bullet-active is-active',
      }}
      slidesPerView="auto"
      centeredSlides
      loop
      speed={1000}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
    >
      {displayArticles.map((slide) => (
        <SwiperSlide key={slide.id} className="w-auto">
          <SliderItem
            image="./images/slide.jpg"
            category={slide.category ? slide.category : ''}
            targetId={slide.id}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SpSlider;
