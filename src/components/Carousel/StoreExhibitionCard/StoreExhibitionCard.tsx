import "./StoreExhibitionCard.scss"
import Grid from "@mui/material/Grid2";
import {Store} from "../../../services/interfaces/Store.ts";
import StarComponent from "../../Star/StarComponent.tsx";

interface StoreExhibitionProps {
    store: Store;
}

export function StoreExhibitionCard({store}: StoreExhibitionProps) {

    return (
        <Grid container
              direction="row"
              className="storeExhibitionCardContainer">

            <img className="storePhoto" src={store.photo} alt="Store Photo"/>
            <Grid container
                  direction="column"
                  className="dataContainer">
                <p className="storeName"><b>{store.name}</b></p>
                <Grid container
                      direction="row"
                      spacing={1}>
                    <StarComponent rating={`${store.rating}`}/>
                    <p className="separator">•</p>
                    <p className="storeDistance">{store.address}</p> {/*@TODO*/}
                </Grid>
            </Grid>

        </Grid>
    );
}