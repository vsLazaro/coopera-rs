import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, A11y, Grid} from 'swiper/modules';
import 'swiper/swiper-bundle.css'
import './Carousel.scss';
import {useState, useEffect, ReactElement, useRef} from 'react'
import MUIGrid from "@mui/material/Grid2";

interface CarouselProps {
    content: ReactElement[],
    rows: number,
    spaceBetween: number,
    maxSlidesPerView: number,
}

export function Carousel({content, rows, spaceBetween, maxSlidesPerView}: CarouselProps) {
    const [showNavButton, setShowNavButton] = useState(content.length > 2);
    const swiperRef = useRef<any>(null);

    useEffect(() => {
        if (rows == 1) {
            setShowNavButton(content.length >= 2);
        } else {
            setShowNavButton(content.length >= 4);
        }
    }, [content, content.length, rows, showNavButton]);

    useEffect(() => {
        const handleResize = () => {
            if (swiperRef.current && swiperRef.current.swiper) {
                swiperRef.current.swiper.update();
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <MUIGrid container className="carouselContainer">
            <Swiper
                ref={swiperRef}
                className="carousel"
                modules={[Navigation, A11y, Grid]}
                spaceBetween={spaceBetween}
                grid={{
                    rows: rows,
                    fill: "row"
                }}
                navigation={showNavButton ? {} : false}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    700: {
                        slidesPerView: 2,
                    },
                    1000: {
                        slidesPerView: Math.min(3,maxSlidesPerView)
                    }
                }}
                onResize={() => {
                    // Atualiza o Swiper quando o próprio componente detecta um resize
                    if (swiperRef.current && swiperRef.current.swiper) {
                        swiperRef.current.swiper.update();
                    }
                }}
            >

                {
                    content.map((item, index) => (
                        <SwiperSlide className="carouselSlide" key={index}>
                            {item}
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </MUIGrid>
    );
}
