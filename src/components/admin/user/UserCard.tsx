import React from "react";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import Userimg from "../../../../public/images/admin/usericon.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

import { deleteUsers } from "@/utils/userW";

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
}) => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user);

  const deleteUser = async (id: number) => {
    try {
      const response = await deleteUsers(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id: number) => {
    dispatch(
      updateValueUser({
        isDelete: true,
        id: id,
      })
    );
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
        rol: rol,
        hash: hash,
        IDTrabajador: IDTrabajador,
        trabajador: trabajador,
      })
    );
  };

  return (
    <Card variant="outlined">
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
            Usuario
          </Typography>
          <Box
            sx={{
              cursor: "pointer",
            }}
          >
            <Tooltip title={"Usuario"}>
              <Image
                width={50}
                height={50}
                className="borde-card"
                alt="farmer icons"
                src={Userimg}
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
              Trabajador: {trabajador}
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
                trabajador
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
