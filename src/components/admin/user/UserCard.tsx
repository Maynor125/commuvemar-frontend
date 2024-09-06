import React, { useEffect, useState } from "react";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import Userimg from "../../../../public/images/admin/usericon.png";
import AdminImg from "../../../../public/images/admin/useradminicon.png"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

import { deleteUsers } from "@/services/userW";

import { updateValueUser } from "@/redux/features/userSlice";
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
import { getWorkersId } from "@/services/workers";

interface UserCardProps {
  id: number;
  email: string;
  rol: string;
  hash: string;
  IDTrabajador: number;
  trabajador: string;
  onClick: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
  id,
  email,
  rol,
  hash,
  IDTrabajador,
  trabajador,
  onClick,
}) => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user);

  const deleteUser = async (id: number) => {
    try {
      const response = await deleteUsers(id);
      onClick();
    } catch (error) {
      console.error(error);
    }
  };

  const getUserName = async (id: number) => {
   try {
    const response = await getWorkersId(id);
    return response.data;
   } catch (error) {
    
   }
  }
  
  const [workerName, setWorkerName] = useState<string>("");
  const [workerApellido, setWorkerApellido] = useState<string>("");

  useEffect(() => {
    const fetchWorkerName = async () => {
      try {
        const response = await getUserName(IDTrabajador);
        if (response) {
          
          setWorkerName(response?.[0].nombre); 
          setWorkerApellido(response?.[0].apellido);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchWorkerName(); // Llama a la función para obtener el nombre del trabajador al montar el componente
  }, [IDTrabajador]);

  const handleDelete = (id: number) => {
    dispatch(
      updateValueUser({
        isDelete: true,
        id: id,
      })
    );
    deleteUser(id);
  };

  const handleEdit = (
    id: number,
    email: string,
    rol: string,
    hash: string,
    IDTrabajador: number,
    trabajador: string
  ) => {
    dispatch(
      updateValueUser({
        isEdit: true,
        id: id,
        email: email,
        role: rol,
        hash: hash,
        IDTrabajador: IDTrabajador,
        trabajador: trabajador,
      })
    );
  };


  return (
    <Card variant="outlined" sx={{transition:'all .4s'}}>
      <CardContent>
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
            gutterBottom
          >
            {rol === "ADMIN" ? 'Administrador' : 'Usuario'}
          </Typography>
          <Box
            sx={{
              cursor: "pointer",
            }}
          >
            <Tooltip title={rol === "ADMIN"?"Admin" :"Usuario"}>
              <Image
                width={50}
                height={50}
                className="borde-card"
                alt="farmer icons"
                src={rol === "ADMIN" ? AdminImg: Userimg}
              />
            </Tooltip>
          </Box>
        </Box>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={5}>
            <Typography
              color={theme.palette.secondary.contrastText}
              variant="subtitle1"
            >
              Trabajador: {workerName} {workerApellido}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography
              color={theme.palette.secondary.contrastText}
              variant="subtitle1"
            >
              Email: {email}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography
              color={theme.palette.secondary.contrastText}
              variant="subtitle1"
              sx={{
                textAlign:'right'
              }}
            >
              Rol: {rol}
            </Typography>
          </Grid>
          <Grid sx={{ gap: "1rem" }} item xs={12}>
            <Button
              sx={{ marginRight: "1rem", color: "white" }}
              variant="contained"
              color="warning"
              onClick={() => handleEdit(
                id,
                email,
                rol,
                hash,
                IDTrabajador,
                trabajador=`${workerName} ${workerApellido}`
              )}
            >
              <EditRoundedIcon sx={{ fontSize: "20px", marginRight: "5px" }} />
              Editar
            </Button>
            <Button
              variant="contained"
              sx={{
                color: "#ffc",
                backgroundColor: "#D43333",
                "&:hover": {
                    backgroundColor: "#a62a2a", // Cambia el color de fondo al pasar el cursor
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

export default UserCard;
