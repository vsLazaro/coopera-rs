import Grid from "@mui/material/Grid2";
import {Product} from "../../../services/interfaces/Product.ts";
import "./ProductCarouselSlide.scss"

interface ProductCarouselSlideProps {
    product: Product;
}

export function ProductCarouselSlide({product}: ProductCarouselSlideProps) {
    return (
            <Grid container
                  direction="row"
                  className="carouselProduct">
                <img className="productPhoto" src={product.photo} alt="Product Photo"/>
                <Grid container
                      className="carouselTextContainer">
                    <p className="productName">{product.name}</p>
                    <p className="productDescription">{product.description}</p>
                </Grid>
            </Grid>
    );
}