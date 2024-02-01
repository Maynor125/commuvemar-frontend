import { Box, Typography, useTheme } from "@mui/material";
import React from "react";

interface Card2Props {
  customColor?: string;
}

const Card2:React.FC<Card2Props> = ({customColor}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "46%",
        background: customColor || theme.palette.secondary.contrastText,
        height: "5rem",
        borderRadius: "5px",
        padding: ".5rem",
        marginBottom: ".5rem",
        marginTop: ".5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Typography variant="subtitle1" sx={{
        fontWeight:'600',
        color: '#000'
      }}>
        Top 10
      </Typography>
      <Typography sx={{
        color: '#003'
      }}>
      Position in dribbble
      </Typography>
      <Typography sx={{
        fontSize:'11px'
      }}>
      20% Increase from Last Week
      </Typography>
    </Box>
  );
};

export default Card2;
