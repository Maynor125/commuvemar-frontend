import Image from "next/image";
import React from "react";
import IconoImage from "../../../../public/images/admin/Iconcard1.svg";
import { Box, Typography, useTheme } from "@mui/material";

interface Card1Props {
  customColor?: string;
}

const Card1:React.FC<Card1Props> = ({customColor}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "8.2rem",
        height: "8.2rem",
        padding: ".4rem",
      }}
      className="borde-card"
    >
      <Image className="iconocard" alt="icono" src={IconoImage} />

      <Typography variant="h5" sx={{ color: theme.palette.secondary.light }}>
        8
      </Typography>
      <Typography
        sx={{ color: theme.palette.secondary.contrastText, fontSize: "14px" }}
      >
        Fichas aprovadas
      </Typography>
      <Typography
        sx={{
          fontSize: "11px",
          color: customColor || theme.palette.secondary.contrastText,
        }}
      >
        +10% from yesterday
      </Typography>
    </Box>
  );
};

export default Card1;
