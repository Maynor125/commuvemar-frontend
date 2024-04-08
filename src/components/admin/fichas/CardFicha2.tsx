import {
  Avatar,
  Button,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import React, { FC } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Ficha } from "../../../types/ficha";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { updateValueFichas } from "@/redux/features/fichaSlice";

interface Props {
  onClick: () => void;
  ficha: Ficha;
}

const CardFicha2: FC<Props> = ({ onClick, ficha }) => {
  const theme = useTheme();
  const router = useRouter();
  const fichasState = useSelector((state: RootState) => state.fichas);
  const dispatch = useDispatch();

  const handlePasarValores = () => {
    dispatch(
      updateValueFichas({
        id: ficha.id,
        nombre: ficha.nombre,
        email: ficha.email,
        finca: ficha.finca,
        productor: ficha.productor,
        location:{
          longitud: ficha.location.longitud,
          latitud: ficha.location.latitud,
        },
        analizada: ficha.analizada
      })
    )
  }

  const handleOpenFicha = () => {
    router.push(`/admin/historyFichas/${ficha.id}`);
    handlePasarValores();
  };

  return (
    <div
      className={`cardFicha ${
        fichasState.AlanizadaFichas && ficha.analizada && "cardFichaActive"
      } `}
      style={{ background: theme.palette.background.default }}
    >
      <div className="cabecera">
        <Avatar
          sx={{
            width: "4.5rem",
            height: "4.5rem",
            bgcolor: fichasState.AlanizadaFichas
              ? ficha.analizada
                ? "#4FBD55"
                : "#4cb9d4"
              : "#4cb9d4",
          }}
          alt={ficha.nombre}
          src="/static/images/avatar/1.jpg"
        />
        <IconButton sx={{ width: "2.6rem", height: "2.6rem" }}>
          <MoreVertIcon />
        </IconButton>
      </div>
      <div className="titleHeader">
        <Typography variant="h6" color={theme.palette.secondary.light}>
          {ficha.nombre}
        </Typography>
        <Typography
          sx={{ fontSize: "14px" }}
          color={theme.palette.secondary.contrastText}
        >
          Inspector interno
        </Typography>
      </div>
      <div className="descContainer">
        <Typography
          color={theme.palette.secondary.contrastText}
          sx={{ fontSize: "14px" }}
        >
          Fecha
        </Typography>
        <Typography
          color={theme.palette.secondary.light}
          sx={{ fontSize: "14px", fontWeight: "600" }}
        >
          Creado el {ficha.fecha}
        </Typography>
      </div>
      <div className="emailContainer">
        <Typography
          color={theme.palette.secondary.contrastText}
          sx={{ fontSize: "14px" }}
        >
          Email
        </Typography>
        <Typography
          color={theme.palette.secondary.light}
          sx={{ fontSize: "14px", fontWeight: "600" }}
        >
          {ficha.email}
        </Typography>
      </div>
      <div className="infoContainer">
        <div className="finca">
          <Typography
            color={theme.palette.secondary.contrastText}
            sx={{ fontSize: "14px" }}
          >
            Finca
          </Typography>
          <Typography
            color={theme.palette.secondary.light}
            sx={{ fontSize: "14px", fontWeight: "600" }}
          >
            {ficha.finca}
          </Typography>
        </div>
        <div className="productor">
          <Typography
            color={theme.palette.secondary.contrastText}
            sx={{ fontSize: "14px" }}
          >
            Productor
          </Typography>
          <Typography
            color={theme.palette.secondary.light}
            sx={{ fontSize: "14px", fontWeight: "600" }}
          >
            {ficha.productor}
          </Typography>
        </div>
      </div>
      <div className="footerCard">
        <Button
          onClick={handleOpenFicha}
          sx={{ textTransform: "none" }}
          variant="outlined"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            color="#168cc8"
            fill="none"
            style={{ marginRight: "5px" }}
          >
            <path
              d="M18.5 16C19.0057 16.4915 21 17.7998 21 18.5M18.5 21C19.0057 20.5085 21 19.2002 21 18.5M21 18.5L13 18.5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11 22H10.7273C7.46607 22 5.83546 22 4.70307 21.2022C4.37862 20.9736 4.09058 20.7025 3.8477 20.3971C3 19.3313 3 17.7966 3 14.7273V12.1818C3 9.21865 3 7.73706 3.46894 6.55375C4.22281 4.65142 5.81714 3.15088 7.83836 2.44135C9.09563 2 10.6698 2 13.8182 2C15.6173 2 16.5168 2 17.2352 2.2522C18.3902 2.65765 19.3012 3.5151 19.732 4.60214C20 5.27832 20 6.12494 20 7.81818V13"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3 12C3 10.1591 4.49238 8.66667 6.33333 8.66667C6.99912 8.66667 7.78404 8.78333 8.43137 8.60988C9.00652 8.45576 9.45576 8.00652 9.60988 7.43136C9.78333 6.78404 9.66667 5.99912 9.66667 5.33333C9.66667 3.49238 11.1591 2 13 2"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>{" "}
          Visitar
        </Button>
        <Button
          onClick={onClick}
          variant="outlined"
          color="success"
          sx={{ textTransform: "none" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="22"
            height="22"
            color="#2FB344"
            fill="none"
            style={{ marginRight: "5px" }}
          >
            <path
              d="M7 18C5.17107 18.4117 4 19.0443 4 19.7537C4 20.9943 7.58172 22 12 22C16.4183 22 20 20.9943 20 19.7537C20 19.0443 18.8289 18.4117 17 18"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M14.5 9C14.5 10.3807 13.3807 11.5 12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9Z"
              stroke="currentColor"
              stroke-width="1.5"
            />
            <path
              d="M13.2574 17.4936C12.9201 17.8184 12.4693 18 12.0002 18C11.531 18 11.0802 17.8184 10.7429 17.4936C7.6543 14.5008 3.51519 11.1575 5.53371 6.30373C6.6251 3.67932 9.24494 2 12.0002 2C14.7554 2 17.3752 3.67933 18.4666 6.30373C20.4826 11.1514 16.3536 14.5111 13.2574 17.4936Z"
              stroke="currentColor"
              stroke-width="1.5"
            />
          </svg>
          Ubicacion
        </Button>
      </div>
    </div>
  );
};

export default CardFicha2;
