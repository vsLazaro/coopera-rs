import React, { useState } from 'react';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, Star } from '@mui/icons-material';
import './StoreCarousel.scss';

export interface Loja {
  id: number;
  nome: string;
  endereco: string;
  distanciaKm: number;
  nota: number;
  filtros: string[];
  imagem: string;
}

interface StoreCarouselProps {
  lojas: Loja[];
}

const StoreCarousel: React.FC<StoreCarouselProps> = ({ lojas }) => {
  const [startIndex, setStartIndex] = useState(0);
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  const visibleCards = isXs ? 1 : isSm ? 1 : isMd ? 2 : 3;

  const handlePrev = () => setStartIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setStartIndex((prev) => Math.min(prev + 1, lojas.length - visibleCards));

  const canGoBack = startIndex > 0;
  const canGoForward = startIndex + visibleCards < lojas.length;

  const handleFiltroClick = (filtro: string) => {
    console.log(`Ir para filtro: ${filtro}`);
  };

  return (
    <Box className="store-carousel-container">
      <IconButton onClick={handlePrev} disabled={!canGoBack}>
        <ArrowBackIos />
      </IconButton>

      <Box className="store-carousel-list">
        {lojas.slice(startIndex, startIndex + visibleCards).map((loja) => (
          <Card key={loja.id} className="store-carousel-card">
            <CardMedia component="img" height="140" image={loja.imagem} alt={loja.nome} />
            <CardContent>
              <Typography variant="h6" fontWeight="bold" align="left">
                {loja.nome}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="left">
                {loja.endereco} | {loja.distanciaKm} km
              </Typography>

              <Stack direction="row" alignItems="flex-start" spacing={1} mt={1}>
                <Star fontSize="small" style={{ color: '#fbc02d' }} />
                <Typography variant="body2" color="#FCCD2A" align="left">
                  {loja.nota}
                </Typography>

                <Box display="flex" ml={2} flexWrap="wrap">
                  {loja.filtros.map((filtro, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      className="store-filtro-tag"
                      onClick={() => handleFiltroClick(filtro)}
                    >
                      {filtro}
                    </Typography>
                  ))}
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>

      <IconButton onClick={handleNext} disabled={!canGoForward}>
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
};

export default StoreCarousel;
