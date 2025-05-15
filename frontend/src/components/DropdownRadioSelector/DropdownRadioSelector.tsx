import "./DropdownRadioSelector.scss";
import { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface DropdownRadioSelectorProps {
  label: string;
  options: string[];
  required?: boolean;
  onChange: (value: string) => void;
}

export default function DropdownRadioSelector({
  label,
  options,
  required = false,
  onChange,
}: DropdownRadioSelectorProps) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    onChange(event.target.value);
    setOpen(false);
  };

  return (
    <Box className="dropdown-container">
      <Box className="dropdown-header" onClick={() => setOpen(!open)}>
        <Box>
          <Typography variant="body1" className="dropdown-title">
            {label}
          </Typography>
          <Typography variant="body2" className="dropdown-subtitle">
            {selectedValue ? selectedValue : "Escolha 1 opção"}
          </Typography>
        </Box>
        {required && <Box className="dropdown-required-badge">OBRIGATÓRIO</Box>}
        <IconButton size="small">
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      {open && (
        <Box className="dropdown">
          <FormControl component="fieldset">
            <RadioGroup value={selectedValue} onChange={handleSelection}>
              {options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio className="dropdown-radio" />}
                  label={option}
                  className="dropdown-radio-label"
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
      )}
    </Box>
  );
}
