import './ProductGrid.scss';
import { useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router";

interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
}

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([
  ]);

  const handleRemove = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <Box className="product-wrapper">
      <Typography variant="h6" align="center" fontWeight="bold" mt={4}>
        A Maior Variedade de Tecidos da Internet. Compre Agora, pague em até 10X
        sem juros e Receba em Casa!
      </Typography>
      <Typography align="center" mt={2}>
        Prezamos sempre em oferecer produtos com qualidade e estar em sintonia
        com os últimos lançamentos do mercado...
      </Typography>

      <Link className="add-button" to="/add-products">
        <AddCircleOutlineIcon fontSize="large" />
        <Typography ml={1}>Adicionar itens à loja</Typography>
      </Link>

      <Grid container spacing={2} mt={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card className="product-card">
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.title}
              />
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="body2" fontWeight="bold" mt={1}>
                  {product.price}
                </Typography>
              </CardContent>
              <IconButton
                className="delete-btn"
                onClick={() => handleRemove(product.id)}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductGrid;
