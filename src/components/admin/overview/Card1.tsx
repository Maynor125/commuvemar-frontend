import Image, { StaticImageData } from "next/image";
import React from "react";
import IconoImage from "../../../../public/images/admin/Iconcard1.svg";
import { Box, Typography, useTheme } from "@mui/material";

interface Card1Props {
  customColor?: string;
  iconPath: StaticImageData;
  title: string;
  value: number;
  porcentaje: string;
}

const Card1: React.FC<Card1Props> = ({
  customColor,
  iconPath,
  title,
  value,
  porcentaje,
}) => {
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
      <Image className="iconocard" alt="icono" src={iconPath} />

      <Typography variant="h5" sx={{ color: theme.palette.secondary.light }}>
        {value}
      </Typography>
      <Typography
        sx={{ color: theme.palette.secondary.contrastText, fontSize: "14px" }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: "11px",
          color: customColor || theme.palette.secondary.contrastText,
        }}
      >
        +{porcentaje}% from yesterday
      </Typography>
    </Box>
  );
};

export default Card1;
