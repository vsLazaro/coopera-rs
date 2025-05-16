import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, A11y} from 'swiper/modules';
import 'swiper/swiper-bundle.css'
import './ProductCarousel.scss';
import {useState, useEffect} from 'react'
import {Product} from '../../services/interfaces/Product.ts'
import Grid from "@mui/material/Grid2";

interface ProductCarouselProps  {
    products: Product[],
}

export function ProductCarousel({products}: ProductCarouselProps) {
    const [showNavButton, setShowNavButton] = useState(products.length > 2);


    useEffect(() => {
        setShowNavButton(products.length >= 2);
    }, [showNavButton]);

    return (
        <Grid container className="carouselContainer">
            <Swiper
                className="carousel"
                modules={[Navigation, A11y]}
                spaceBetween={12}
                slidesPerView="auto"
                navigation={showNavButton ? {} : false}
                breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        600: {
                            slidesPerView: 2,
                        }}
            }
            >

                {
                    products.map((_, index) => (
                        <SwiperSlide className="carouselProductContainer" key={index}>
                            <Grid container
                                  direction="row"
                                  className="carouselProduct">
                                <img className="productPhoto" src={products[index].photo}/>
                                <Grid container
                                      className="carouselTextContainer">
                                    <p className="productName">{products[index].name}</p>
                                    <p className="productDescription">{products[index].description}</p>
                                </Grid>
                            </Grid>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </Grid>
    );
};
