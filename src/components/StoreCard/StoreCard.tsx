import "./StoreCard.scss";
import { Box, Typography } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import StarIcon from "@mui/icons-material/Star";

interface StoreCardProps {
  name: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
}

const StoreCard = ({
  name,
  rating,
  deliveryTime,
  deliveryFee,
}: StoreCardProps) => {
  return (
    <Box className="store-card">
      <Box className="store-card-header">
        <StorefrontIcon className="store-card-icon" />
        <Typography variant="body1" className="store-card-name">
          {name}
        </Typography>
        <Box className="store-card-rating">
          <StarIcon className="store-card-star-icon" />
          <Typography variant="body2" className="store-card-rating-text">
            {rating}
          </Typography>
        </Box>
      </Box>
      <Box className="store-card-divider" />
      <Typography variant="body2" className="store-card-info">
        {deliveryTime} R$ {deliveryFee}
      </Typography>
    </Box>
  );
};

export default StoreCard;
