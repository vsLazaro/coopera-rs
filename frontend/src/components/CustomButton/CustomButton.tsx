import * as React from "react";
import Button from "@mui/material/Button";

type ButtonType = "button" | "submit" | "reset";
export interface ButtonProps {
  text: string;
  onClick: () => void;
  styles?: object;
  type?: ButtonType;
}

const CustomButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <Button
      type={props.type}
      sx={props.styles}
      onClick={props.onClick}
      variant="contained"
    >
      {props.text}
    </Button>
  );
};

export default CustomButton;
