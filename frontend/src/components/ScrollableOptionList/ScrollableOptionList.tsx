import "./ScrollableOptionList.scss";
import { Box } from "@mui/material";
import DropdownRadioSelector from "../DropdownRadioSelector/DropdownRadioSelector";

interface OptionListProps {
  options: { [key: string]: string[] }[];
  onChange: (label: string, value: string) => void;
}

const ScrollableOptionList = (props: OptionListProps) => {
  return (
    <Box
      sx={{
        maxWidth: "500px",
        maxHeight: "230px",
        overflowY: "auto",
        paddingRight: "8px",
        marginRight: "-8px",
        marginBottom: "6px",
      }}
      className="option-list-container"
    >
      {props.options.map((option, index) => {
        const label = Object.keys(option)[0];
        const values = option[label];

        return (
          <Box key={index} style={{ marginBottom: 2 }}>
            <DropdownRadioSelector
              label={`Escolha ${label}`}
              options={values}
              required
              onChange={(value) => props.onChange(label, value)}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default ScrollableOptionList;
