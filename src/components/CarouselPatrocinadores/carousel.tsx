import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import './carousel.scss';
import { useState, useEffect } from 'react';

interface CarouselItem {
  image: string;
  link: string;
  date: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

export function Carousel({ items }: CarouselProps) {
  const sortedItems = [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const [showNavButton, setShowNavButton] = useState(sortedItems.length >= 4);

  useEffect(() => {
    setShowNavButton(sortedItems.length >= 4);
  }, [sortedItems]);

  return (
    <div className="carouselContainer">
      <Swiper
        className="carousel"
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={24}
        slidesPerView={3}
        navigation={showNavButton ? {} : false}
      >
        {sortedItems.map((item, index) => (
          <SwiperSlide className="carouselImg" key={index}>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <img src={item.image} alt={`Patrocinador ${index + 1}`} />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}