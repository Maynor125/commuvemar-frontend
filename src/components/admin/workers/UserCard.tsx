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

interface UserCardProps {
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber: string;
  avatarUrl?: string;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
  firstName,
  lastName,
  fullName,
  phoneNumber,
  avatarUrl,
  onEdit,
  onDelete,
  isAdmin,
}) => {
  const theme = useTheme();
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
              {isAdmin ? (
                <AdminPanelSettingsRoundedIcon />
              ) : (
                <EngineeringRoundedIcon />
              )}
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
              Nombres y Apellidos: {fullName}
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
              <IconButton aria-label="Editar" onClick={onEdit}>
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
              <IconButton aria-label="Eliminar" onClick={onDelete}>
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
