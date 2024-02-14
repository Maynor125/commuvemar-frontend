import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
  Tooltip,
  useTheme,
} from "@mui/material";
import Farmer from "../../../../public/images/admin/farmericon.png";
import Image from "next/image";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

interface Props {
  id: number;
  nombre: string;
  apellido: string;
  numeroCedula: string;
  numeroTelefono: string;
  fechaEntradaPrograma: Date;
  estado: number;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const ProductorCard: React.FC<Props> = ({
  id,
  nombre,
  apellido,
  numeroCedula,
  numeroTelefono,
  fechaEntradaPrograma,
  estado,
  onDelete,
  onEdit,
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
                Lana R
              </Typography>
              <Tooltip sx={{ cursor: "pointer" }} title="Productor">
                <Box>
                  <Image
                    width={50}
                    height={50}
                    className="borde-card"
                    alt="farmer icons"
                    src={Farmer}
                  />
                </Box>
              </Tooltip>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body1">Nombre: Juan</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body1">Apellido: Pérez</Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body1">
              Numero de cédula: 610-140902-1006F
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body1">
              Numero de teléfono: 8366-2243
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body1">
              Ingreso al programa: 10-02-22{" "}
              {/*new Date(registrationDate).toLocaleDateString()*/}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body1">Estado del productor: 4</Typography>
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
  );
};

export default ProductorCard;
