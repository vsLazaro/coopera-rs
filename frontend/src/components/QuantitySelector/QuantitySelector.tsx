import "./QuantitySelector.scss";
import { Box, IconButton, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/ArrowLeft";
import AddIcon from "@mui/icons-material/ArrowRight";

interface QuantitySelectorProps {
  value: number;
  onChange: (newValue: number) => void;
}

const QuantitySelector = (props: QuantitySelectorProps) => {
  const handleDecrease = () => {
    if (props.value > 1) props.onChange(props.value - 1);
  };

  const handleIncrease = () => {
    props.onChange(props.value + 1);
  };

  return (
    <Box className="selector-container">
      <IconButton onClick={handleDecrease} className="selector-button">
        <RemoveIcon />
      </IconButton>
      <Typography className="value">{props.value}</Typography>
      <IconButton onClick={handleIncrease} className="selector-button">
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default QuantitySelector;
