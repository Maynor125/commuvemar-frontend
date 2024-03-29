import React from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { SvgIconComponent } from "@mui/icons-material";

interface BotonAccionProps {
  onClick?: (param?: any) => Promise<void> | void;
  tooltipTitle?: string;
  icon: SvgIconComponent; // Se espera un componente de icono
  bgColor: string;
}

const BtnAction: React.FC<BotonAccionProps> = ({
  onClick,
  tooltipTitle,
  icon: Icon,
  bgColor
}) => {
  const handleClick = async (param?: any) => {
    if (onClick) {
      try {
        await onClick(param);
      } catch (error) {
        // Manejar el error aquí si es necesario
        console.error(error);
      }
    }
  };
  return (
    <Box>
      <Tooltip title={tooltipTitle}>
        <IconButton onClick={() => handleClick()}>
          <Icon sx={{
                    color: "#ffc",
                    backgroundColor: bgColor,
                    width: "1.9rem",
                    height: "1.9rem",
                    padding: ".3rem",
                    borderRadius: "4px",
                  }}/>
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default BtnAction;
