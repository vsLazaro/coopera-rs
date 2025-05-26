import "./PriceStockForm.scss";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  FormControl,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { HeaderCompleto } from "../header/headerCompleto";
import { NumericFormat } from "react-number-format";

export const CurrencyInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <NumericFormat
      customInput={TextField}
      label="Preço"
      value={value}
      onValueChange={(values) => onChange(values.value)}
      thousandSeparator="."
      decimalSeparator=","
      prefix="R$ "
      decimalScale={2}
      fixedDecimalScale
      fullWidth
    />
  );
};

interface Variation {
  id: number;
  title: string;
  price: string;
  stock: string;
  open: boolean;
}

const PriceStockForm: React.FC = () => {
  const [variations, setVariations] = useState<Variation[]>([]);
  const [nextId, setNextId] = useState(1);

  const handleToggle = (index: number) => {
    setVariations((prev) =>
      prev.map((v, i) => (i === index ? { ...v, open: !v.open } : v))
    );
  };

  const handleChange = (
    index: number,
    field: "price" | "stock" | "title",
    value: string
  ) => {
    const updated = [...variations];
    updated[index][field] = value;
    setVariations(updated);
  };

  const handleAddVariation = () => {
    setVariations((prev) => [
      ...prev,
      {
        id: nextId,
        title: `Variação ${nextId}`,
        price: "",
        stock: "",
        open: false,
      },
    ]);
    setNextId(nextId + 1);
  };

  const handleRemove = (index: number) => {
    setVariations((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <HeaderCompleto />
      <Box p={4} maxWidth="600px" margin="50px auto auto auto">
        <Typography variant="h5" align="center" mb={4}>
          Adicionar <strong>Preço e Estoque</strong>
        </Typography>

        {variations.map((v, index) => (
          <Accordion
            className="accordion"
            key={v.id}
            expanded={v.open}
            onChange={() => handleToggle(index)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box
                display="flex"
                justifyContent="space-between"
                width="100%"
                alignItems="center"
              >
                <Box>
                  <TextField
                    label="Titulo"
                    value={v.title}
                    style={{ fontWeight: "bold" }}
                    onChange={(e) =>
                      handleChange(index, "title", e.target.value)
                    }
                    variant="standard"
                    fullWidth
                  />

                  <Typography fontSize={12} color="gray">
                    informe preço e estoque
                  </Typography>
                </Box>

                <IconButton onClick={() => handleRemove(index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box display="flex" gap={2} flexDirection="column">
                <CurrencyInput
                  value={v.price}
                  onChange={(val) => handleChange(index, "price", val)}
                />
                <FormControl fullWidth>
                  <TextField
                    label="Estoque"
                    fullWidth
                    type="number"
                    value={v.stock}
                    onChange={(e) =>
                      handleChange(index, "stock", e.target.value)
                    }
                  />
                </FormControl>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}

        <Box mt={2} display="flex" justifyContent="center">
          <Button
            startIcon={<AddIcon />}
            onClick={handleAddVariation}
            variant="outlined"
          >
            Adicionar Variação
          </Button>
        </Box>

        <span className="line" />

        <Box mt={3} textAlign="center">
          <Button variant="contained" className="button" color="success">
            Concluir
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default PriceStockForm;
