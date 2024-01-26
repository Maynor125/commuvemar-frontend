"use client";
import React from "react";
import IconButton from "@mui/material/IconButton";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Badge from "@mui/material/Badge";
import { Tooltip, useTheme } from "@mui/material";

interface NotificationIconButtonProps {
  onClick: () => void;
  hasNotifications: boolean;
}

const Notification: React.FC<NotificationIconButtonProps> = ({
  onClick,
  hasNotifications,
}) => {
  const theme = useTheme();
  return (
    <Tooltip
      title={hasNotifications ? "tienes notificaciones" : "notificaciones"}
    >
      <IconButton sx={{color:theme.palette.secondary.dark}} onClick={onClick} color="inherit">
        <Badge
          variant="dot" // Utiliza un indicador circular sin número
          color="error"
          invisible={!hasNotifications}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          overlap="circular"
        >
          <NotificationsNoneOutlinedIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};

export default Notification;
