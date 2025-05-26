import { Avatar, Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import "./StoreProducts.scss";
import { Carousel } from "../Carousel/Carousel";
import { ProductCarouselSlide } from "../Carousel/ProductCarouselSlide/ProductCarouselSlide";
import { ReactElement } from "react";
import { Product } from "../../services/interfaces/Product";
import { Store } from "../../services/interfaces/Store";

interface StoresAndProductsProps {
  stores: Store[];
  products: Product[];
}

const StoreProducts = ({ stores, products }: StoresAndProductsProps) => {
  const carouselProducts: ReactElement[] = [];

  products?.forEach((p) =>
    carouselProducts.push(<ProductCarouselSlide product={p} />)
  );

  return (
    <>
      {stores?.map((store) => (
        <Box key={store.name} className="store-products">
          <Box className="store-container-products">
            <Box className="store-header-products" mb={3}>
              <Avatar src={store.photo} sx={{ width: 56, height: 56 }} />
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {store.name}
                </Typography>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <StarIcon sx={{ color: "#FFC107", fontSize: 18 }} />
                  <Typography variant="body2" color="text.secondary">
                    {store.rating}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Carousel
              content={carouselProducts}
              rows={1}
              spaceBetween={1}
              maxSlidesPerView={2}
            />
          </Box>
        </Box>
      ))}
    </>
  );
};

export default StoreProducts;
