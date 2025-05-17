import Grid from "@mui/material/Grid2";
import {ProductCarousel} from "../ProductCarousel/ProductCarousel.tsx";
import {Product} from '../../services/interfaces/Product.ts'
import "./StoreExhibition.scss"
import StarComponent from "../Star/StarComponent.tsx";


export function StoreExhibition() {
    // @TODO

    const products: Product[] = [
        {
            name: "Produto Teste 1",
            description: "Descrição teste para o produto teste 3",
            photo: "https://picsum.photos/id/1041/200/300",
            category: [],
            subcategory: {},
            price: 0,
            quantity: 0
        },
        {
            name: "Produto Teste 2",
            description: "Descrição teste para o produto teste 3",
            photo: "https://picsum.photos/id/1041/200/300",
            category: [],
            subcategory: {},
            price: 0,
            quantity: 0
        },
        {
            name: "Produto Teste 3",
            description: "Descrição teste para o produto teste 3",
            photo: "https://picsum.photos/id/1041/200/300",
            category: [],
            subcategory: {},
            price: 0,
            quantity: 0
        }
    ]

    return (
        <Grid container
              className="container">
            <Grid container
                  direction="column"
            >

                <Grid container
                      direction="row"
                      className="storeData"
                      spacing={2}
                >
                    <img className="storeImg" src="https://picsum.photos/id/1041/200/300" alt="Store Photo"/>
                    <p><b>Nome da Loja</b></p>
                    <StarComponent rating={"8.4"}/>
                </Grid>
                <ProductCarousel products={products}/>
            </Grid>
        </Grid>
    );
}