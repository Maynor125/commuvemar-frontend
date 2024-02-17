import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Farm from "../../../../public/images/admin/farmicon.png";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { updateValueFincas,clearValueFincas } from "@/redux/features/fincaSlice";

interface Props {
  nombre: string;
  comunidad: string;
  areaCacaoProduccion: string;
  areaCacaoDesarrollo: string;
  produccionUltimoSiclo: string;
  IDProductor?: number;
  idFinca?: number;
  productor: string;
  onEdit?: (finca: Props) => void;
  onDelete: (id: number) => void;
}

const FincasCard: React.FC<Props> = ({
  idFinca,
  nombre,
  comunidad,
  areaCacaoProduccion,
  areaCacaoDesarrollo,
  produccionUltimoSiclo,
  IDProductor,
  productor,
  onDelete,
  onEdit,
}) => {
  const dispatch = useDispatch();
  const fincaState = useSelector((state: RootState) => state.finca);
  console.log("Updated objects array:",fincaState);

  const handleEdit = (
    nombre: string,
    comunidad: string,
    areaCacaoProduccion: string,
    areaCacaoDesarrollo: string,
    produccionUltimoSiclo: string,
    IDProductor: number,
    idFinca: number,
    productor: string
  ) => {
    dispatch(
      updateValueFincas({
        isEdit: true,
        nombre: nombre,
        comunidad: comunidad,
        areaCacaoProduccion: areaCacaoProduccion,
        areaCacaoDesarrollo: areaCacaoDesarrollo,
        produccionUltimoSiclo: produccionUltimoSiclo,
        IDProductor: IDProductor,
        idFinca: idFinca,
        productor: productor,
      })
    );

  };

  const theme = useTheme();
  const [isEdit, setIsEdit] = useState(false);
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                color={theme.palette.secondary.light}
                variant="h6"
                component="h2"
              >
                Finca {nombre}
              </Typography>
              <Tooltip sx={{ cursor: "pointer" }} title="Finca">
                <Box>
                  <Image
                    width={50}
                    height={50}
                    className="borde-card"
                    alt="farmer icons"
                    src={Farm}
                  />
                </Box>
              </Tooltip>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body1">Nombre: {nombre}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body1">Comunidad: {comunidad}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body1">
              areaCacaoProduccion: {areaCacaoProduccion}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body1">
              areaCacaoDesarrollo: {areaCacaoDesarrollo}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body1">
              produccionUltimoSiclo: {produccionUltimoSiclo}
              {/*new Date(registrationDate).toLocaleDateString()*/}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body1">Productor: {productor}</Typography>
          </Grid>

          <Grid sx={{ gap: "1rem" }} item xs={12}>
            <Button
              sx={{ marginRight: "1rem", color: "white" }}
              variant="contained"
              color="warning"
              onClick={() =>
                handleEdit(
                  nombre,
                  comunidad,
                  areaCacaoProduccion,
                  areaCacaoDesarrollo,
                  produccionUltimoSiclo,
                  IDProductor,
                  idFinca,
                  productor
                )
              }
            >
              <EditRoundedIcon sx={{ fontSize: "20px", marginRight: "5px" }} />
              Editar
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() =>
                idFinca !== undefined && onDelete && onDelete(idFinca)
              }
            >
              <DeleteRoundedIcon
                sx={{ fontSize: "20px", marginRight: "5px" }}
              />
              Eliminar
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FincasCard;
