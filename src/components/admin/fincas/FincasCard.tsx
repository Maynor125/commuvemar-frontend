
import { Box, Button, Card, CardContent, Grid, Tooltip, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import React from 'react'

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Farm from "../../../../public/images/admin/farmicon.png";

interface Props {
    nombre: string;
    comunidad: string;
    areaCacaoProduccion: string;
    areaCacaoDesarrollo: string;
    produccionUltimoSiclo: string;
    IDProductor: number;
    idFinca?: number;
    onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const FincasCard:React.FC<Props>= ({
    idFinca,
    nombre,
    comunidad,
    areaCacaoProduccion,
    areaCacaoDesarrollo,
    produccionUltimoSiclo,
    IDProductor
}) => {
    const theme = useTheme();
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
              La mamalona
            </Typography>
            <Tooltip sx={{ cursor: "pointer" }} title="Productor">
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
          <Typography variant="body1">Nombre: Juan</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body1">Comunidad: El limon</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body1">
          areaCacaoProduccion: 6 MZ
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body1">
          areaCacaoDesarrollo: 2 MZ
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body1">
          produccionUltimoSiclo: 50 KT{" "}
            {/*new Date(registrationDate).toLocaleDateString()*/}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body1">IDProductor: 4</Typography>
        </Grid>

        <Grid sx={{ gap: "1rem" }} item xs={12}>
          <Button
            sx={{ marginRight: "1rem", color: "white" }}
            variant="contained"
            color="warning"
            onClick={() => onEdit(id)}
          >
            <EditRoundedIcon sx={{ fontSize: "20px", marginRight: "5px" }} />
            Editar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => onDelete(id)}
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
  )
}

export default FincasCard