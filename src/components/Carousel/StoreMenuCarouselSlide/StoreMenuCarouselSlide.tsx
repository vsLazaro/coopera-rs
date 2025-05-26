import Grid from "@mui/material/Grid2";
import {Store} from "../../../services/interfaces/Store.ts";
import "./StoreMenuCarouselSlide.scss"
import StarComponent from "../../Star/StarComponent.tsx";

interface StoreCarouselSlideProps {
    store: Store;
}

export function StoreMenuCarouselSlide({ store, distance }: StoreCarouselSlideProps & { distance?: number }) {
    return (
        <Grid container
              direction="column"
              className="carouselMenuStore">
            <img className="menuStorePhoto" src={store.photo} alt="Store Photo" />
            <p className="menuStoreName">{store.name}</p>
            <Grid container
                  direction="row"
                  spacing={1}
                  className="carouselMenuTextContainer">
                <p className="menuStoreAddress">{store.address} - {distance ? `${distance.toFixed(0)} km` : "..."}</p>
            </Grid>
            <Grid container
                  direction="row"
                  spacing={1}
                  className="carouselMenuTextContainer">
                <p className="menuStoreRating">{<StarComponent rating={`${store.rating}`} />}</p>
                <p className="separator">•</p>
                <p className="menuStoreCategory">{store.category}</p>
            </Grid>
        </Grid>
    );
}