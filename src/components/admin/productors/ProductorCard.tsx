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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { updateValueProductor } from "@/redux/features/productorsSlice";
import { deleteProductors } from "@/services/productors";

interface Props {
  id: number;
  nombre: string;
  apellido: string;
  numeroCedula: string;
  numeroTelefono: string;
  fechaEntradaPrograma: Date;
  estadoProgramaC: number;
  onClick: () => void;
}

const ProductorCard: React.FC<Props> = ({
  id,
  nombre,
  apellido,
  numeroCedula,
  numeroTelefono,
  fechaEntradaPrograma,
  estadoProgramaC,
  onClick,

}) => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const productorState = useSelector((state: RootState) => state.productor);
  //console.log("Updated objects array:",productorState);

  
  const deleteProductor = async (id: number) => {
    try {
      const response = await deleteProductors(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (
    id:number
  )=>{
    dispatch(updateValueProductor({
      isDelete:true,
      id:id,
    }))
    deleteProductor(id);
    onClick();
  }

  const handleEdit = (
  id: number,
  nombre: string,
  apellido: string,
  numeroCedula: string,
  numeroTelefono: string,
  fechaIngresoPrograma:Date,
  estado: number
  )=>{
   dispatch(
    updateValueProductor({
      isEdit: true,
      id:id,
      nombre:nombre,
      apellido:apellido,
      numeroCedula:numeroCedula,
      numeroTelefono:numeroTelefono,
      fechaIngresoPrograma:fechaIngresoPrograma,
      estado:estado,
    })
   )
  }
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
                {nombre} {apellido}
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
            <Typography variant="body1">Nombre: {nombre}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body1">Apellido: {apellido}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body1">
              Numero de cédula: {numeroCedula}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body1">
              Numero de teléfono: {numeroTelefono}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body1">
              Ingreso al programa: {new Date(fechaEntradaPrograma).toLocaleDateString('es-ES',{year:'numeric',month:'long',day:'numeric'}) }
              {/*new Date(registrationDate).toLocaleDateString()*/}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body1">Estado del productor: {estadoProgramaC}</Typography>
          </Grid>

          <Grid sx={{ gap: "1rem" }} item xs={12}>
            <Button
              sx={{ marginRight: "1rem", color: "white" }}
              variant="contained"
              color="warning"
              onClick={() => handleEdit(
                id,
                nombre,
                apellido,
                numeroCedula,
                numeroTelefono,
                fechaEntradaPrograma=fechaEntradaPrograma,
                estadoProgramaC
              )}
            >
              <EditRoundedIcon sx={{ fontSize: "20px", marginRight: "5px" }} />
              Editar
            </Button>
            <Button
              variant="contained"
              sx={{
                color: "#fff",
                backgroundColor: "#D43333",
                "&:hover": {
                  backgroundColor:  "#a62a2a", // Cambia el color de fondo al pasar el cursor
                },
              }}
              onClick={()=>handleDelete(id)}
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
