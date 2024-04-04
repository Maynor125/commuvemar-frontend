import {
  Avatar,
  Box,
  Divider,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { FC } from "react";

interface Props {
  isRevised: boolean;
}

const ListActivityItem: FC<Props> = ({ isRevised }) => {
  const theme = useTheme();
  const fontColor = theme.palette.secondary.light;
  const fontColor1 = theme.palette.secondary.contrastText;
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop:'1rem'
        }}
      >
        <Box sx={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
          <Avatar
            sx={{ width: "3rem", height: "3rem" }}
            alt="Juan Perez"
            src="/"
          />
          <Box>
            <Typography color={fontColor}>
              Juan Perez{" "}
              <span style={{ fontSize: "15px" }}>
                Ha completado ficha de inspeccion de la finca la{" "}
              </span>
              Mamalona
            </Typography>
            <Typography sx={{ fontSize: "13px" }} color={fontColor1}>
              hace 2 horas
            </Typography>
          </Box>
        </Box>
        <Tooltip
          title={
            isRevised
              ? "La ficha ah sido revisada"
              : "La ficha no ah sido revisada"
          }
        >
          <Box
            sx={{
              backgroundColor: isRevised ? "#BEF9C1" : "#FEDDC7",
              width: "2rem",
              height: "2rem",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            {isRevised ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                width="20"
                height="20"
                color="#4fbd55"
                fill="none"
              >
                <path
                  d="M3 13.3333C3 13.3333 4.5 14 6.5 17C6.5 17 6.78485 16.5192 7.32133 15.7526M17 6C14.7085 7.14577 12.3119 9.55181 10.3879 11.8223"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8 13.3333C8 13.3333 9.5 14 11.5 17C11.5 17 17 8.5 22 6"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                color="#e63e20"
                fill="none"
              >
                <path
                  d="M19 5L5 19M5 5L19 19"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            )}
          </Box>
        </Tooltip>
      </Box>
      <Divider sx={{ marginTop: "1rem" }} />
    </Box>
  );
};

export default ListActivityItem;
