import "./CustomModal.scss";
import { useState } from "react";
import { Modal, Box, Typography, IconButton, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomButton from "../CustomButton/CustomButton";
import productImage from "../../assets/product-image.png";
import StoreCard from "../StoreCard/StoreCard";
import QuantitySelector from "../QuantitySelector/QuantitySelector";
import ScrollableOptionList from "../ScrollableOptionList/ScrollableOptionList";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  options: { [key: string]: string[] }[];
}

const CustomModal = (props: ModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const handleSelectionChange = (value: string) => {
    console.log("Selected:", value);
  };

  return (
    <Modal open={props.isOpen} onClose={props.onClose}>
      <Box className="modal-container">
        <IconButton className="modal-close-button" onClick={props.onClose}>
          <CloseIcon />
        </IconButton>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <Box className="modal-image-container">
              <img
                src={productImage}
                alt="Tecidos de Algodão"
                className="modal-image"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography variant="h6" className="modal-title">
              Tecidos de Algodão Coloridos
            </Typography>
            <Typography variant="body2" className="modal-description">
              Tecidos 100% algodão. Escolha o tamanho e a cor que deseja.
            </Typography>
            <Box sx={{ padding: "20px 0" }}>
              <StoreCard
                name="Loja Tecidos Nossa Senhora"
                rating={8.4}
                deliveryTime="40-55 min"
                deliveryFee="6,99"
              />
            </Box>
            <ScrollableOptionList
              options={props.options}
              onChange={handleSelectionChange}
            />
            <Box className="modal-container-footer">
              <QuantitySelector value={quantity} onChange={setQuantity} />
              <Box className="modal-footer">
                <CustomButton
                  styles={{
                    textTransform: "capitalize",
                    fontFamily: "Istok Web",
                    fontWeight: "bold",
                    borderRadius: "7px",
                    heigth: "80px",
                    marginTop: "2px",
                    fontSize: "18px",
                    backgroundColor: "#008C43",
                  }}
                  onClick={props.onClose}
                  text={`Adicionar R$ ${(39.9 * quantity)
                    .toFixed(2)
                    .replace(".", ",")}`}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default CustomModal;
