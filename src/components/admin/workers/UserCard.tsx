import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  IconButton,
  useTheme,
  Tooltip,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Avatars from "../avatar/Avatar";

import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import EngineeringRoundedIcon from "@mui/icons-material/EngineeringRounded";

import Workerimg from "../../../../public/images/admin/workericon.png";
import Adminimg from "../../../../public/images/admin/adminicon.png";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { deleteWorkers } from "@/utils/workers";
import { updateValueWorker } from "@/redux/features/workerSlice";

interface UserCardProps {
  id: number;
  firstName: string;
  lastName: string;
  fullName?: string;
  phoneNumber: string;
  avatarUrl: string;
  isAdmin?: boolean;
  onClick: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
  id,
  firstName,
  lastName,
  fullName,
  phoneNumber,
  avatarUrl,
  isAdmin,
  onClick,
}) => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const workerState = useSelector((state: RootState) => state.worker);

  const deleteWorker = async (id: number) => {
    try {
      const response = await deleteWorkers(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id: number) => {
    dispatch(
      updateValueWorker({
        isDelete: true,
        id: id,
      })
    );
    deleteWorker(id);
    onClick();
  };

  const handleEdit = (
    id: number,
    nombre: string,
    apellido: string,
    numeroTelefono: string,
    urlImg: string
  ) => {
    dispatch(
      updateValueWorker({
        isEdit: true,
        id: id,
        nombre: nombre,
        apellido: apellido,
        numeroTelefono: numeroTelefono,
        urlImg: urlImg,
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
            Nombre de usuario: {firstName}
          </Typography>
          <Box
            sx={{
              cursor: "pointer",
            }}
          >
            <Tooltip title={isAdmin ? "Administrador" : "Inspector"}>
              <Image
                width={50}
                height={50}
                className="borde-card"
                alt="farmer icons"
                src={isAdmin ? Adminimg : Workerimg}
              />
            </Tooltip>
          </Box>
        </Box>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={2}>
            <Avatars alt={firstName} />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Typography
              color={theme.palette.secondary.contrastText}
              variant="subtitle1"
            >
              Nombres y Apellidos: {firstName} {lastName}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography
              color={theme.palette.secondary.contrastText}
              variant="subtitle1"
            >
              Teléfono: {phoneNumber}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Tooltip title="Editar Trabajador">
              <IconButton
                aria-label="Editar"
                onClick={() => {
                  handleEdit(id, firstName, lastName, phoneNumber, avatarUrl);
                }}
              >
                <EditIcon
                  sx={{
                    color: "#ffc",
                    backgroundColor: "#FFCD43",
                    width: "1.9rem",
                    height: "1.9rem",
                    padding: ".3rem",
                    borderRadius: "4px",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar Trabajador">
              <IconButton
                aria-label="Eliminar"
                onClick={() => handleDelete(id)}
              >
                <DeleteIcon
                  sx={{
                    color: "#ffc",
                    backgroundColor: "#D43333",
                    width: "1.9rem",
                    height: "1.9rem",
                    padding: ".3rem",
                    borderRadius: "4px",
                  }}
                />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UserCard;
