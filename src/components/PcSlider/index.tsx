import { useRecoilValue } from 'recoil';
import { Pagination, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import SliderItem from '@/components/SliderItem';
import { allArticlesState } from '@/globalStates/allArticlesState';

const PcSlider = () => {
  const allArticles = useRecoilValue(allArticlesState);

  // timelineOnly が false のものだけを取り出し、さらに先頭の9件を取り出す
  const displayArticles = allArticles
    .filter((article) => article.timelineOnly === false)
    .slice(0, 9);

  if (displayArticles.length < 9) {
    return null;
  }

  return (
    <Swiper
      modules={[Pagination, A11y, Autoplay]}
      spaceBetween={26}
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
      <SwiperSlide className="w-auto">
        <SliderItem
          image="./images/slide.jpg"
          category={
            displayArticles[0].category ? displayArticles[0].category : ''
          }
          targetId={displayArticles[0].id}
        />
      </SwiperSlide>
      <SwiperSlide className="w-auto">
        <div className="grid gap-4">
          <SliderItem
            image="./images/slide.jpg"
            category={
              displayArticles[1].category ? displayArticles[1].category : ''
            }
            targetId={displayArticles[1].id}
            isSmall
          />
          <SliderItem
            image="./images/slide.jpg"
            category={
              displayArticles[2].category ? displayArticles[2].category : ''
            }
            targetId={displayArticles[2].id}
            isSmall
          />
        </div>
      </SwiperSlide>
      <SwiperSlide className="w-auto">
        <SliderItem
          image="./images/slide.jpg"
          category={
            displayArticles[3].category ? displayArticles[3].category : ''
          }
          targetId={displayArticles[3].id}
        />
      </SwiperSlide>
      <SwiperSlide className="w-auto">
        <div className="grid gap-4">
          <SliderItem
            image="./images/slide.jpg"
            category={
              displayArticles[4].category ? displayArticles[4].category : ''
            }
            targetId={displayArticles[4].id}
            isSmall
          />
          <SliderItem
            image="./images/slide.jpg"
            category={
              displayArticles[5].category ? displayArticles[5].category : ''
            }
            targetId={displayArticles[5].id}
            isSmall
          />
        </div>
      </SwiperSlide>
      <SwiperSlide className="w-auto">
        <SliderItem
          image="./images/slide.jpg"
          category={
            displayArticles[6].category ? displayArticles[6].category : ''
          }
          targetId={displayArticles[6].id}
        />
      </SwiperSlide>
      <SwiperSlide className="w-auto">
        <div className="grid gap-4">
          <SliderItem
            image="./images/slide.jpg"
            category={
              displayArticles[7].category ? displayArticles[7].category : ''
            }
            targetId={displayArticles[7].id}
            isSmall
          />
          <SliderItem
            image="./images/slide.jpg"
            category={
              displayArticles[8].category ? displayArticles[8].category : ''
            }
            targetId={displayArticles[8].id}
            isSmall
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default PcSlider;
