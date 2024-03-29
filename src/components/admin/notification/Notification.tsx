"use client";
import React, { useEffect, useRef, useState } from "react";
import IconButton from "@mui/material/IconButton";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Badge from "@mui/material/Badge";
import { Box, Tooltip, Typography, useTheme } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

interface NotificationIconButtonProps {
  onClick: () => void;
  hasNotifications: boolean;
}

const Notification: React.FC<NotificationIconButtonProps> = ({
  onClick,
  hasNotifications,
}) => {
  const theme = useTheme();
  const [openN, setOpenN] = useState(false);
  const containerNotificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerNotificationRef.current &&
        !containerNotificationRef.current.contains(event.target as Node)
      ) {
        setOpenN(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpenNotification = (event: React.MouseEvent<HTMLElement>) => {
    setOpenN(!openN);
  };

  return (
    <Box sx={{ position: "relative", zIndex: 1 }}>
      <Tooltip
        title={hasNotifications ? "tienes notificaciones" : "notificaciones"}
      >
        <IconButton
          sx={{ color: theme.palette.secondary.dark }}
          onClick={handleOpenNotification}
          color="inherit"
        >
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
      <Box
        ref={containerNotificationRef}
        sx={{
          width: "20rem",
          transition: "all",
          transitionDuration: ".5s",
          display: openN ? "block" : "none",
          position: "absolute",
          top: "2.9rem",
          right: "2.3rem",
          backgroundColor: theme.palette.background.paper,
          height: "15rem",
        }}
      >
        <div className="borde-card">
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "15rem",
              justifyContent: "start",
              flexDirection: "column",
              gap: "1rem",
              padding: ".8rem 1.5rem",
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" color={theme.palette.secondary.light}>
                Notifications
              </Typography>
              <Tooltip title="Marcar todos como leidos?">
                <IconButton>
                  <MailOutlineIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{}}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height:'10rem',
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                  color={theme.palette.secondary.contrastText}
                  fill="none"
                >
                  <path
                    d="M2 5L8.91302 8.92462C11.4387 10.3585 12.5613 10.3585 15.087 8.92462L22 5"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M21.9928 11C22.0047 10.1743 22.0019 10.3514 21.9842 9.52439C21.9189 6.45886 21.8862 4.92609 20.7551 3.79066C19.6239 2.65523 18.0497 2.61568 14.9012 2.53657C12.9607 2.48781 11.0393 2.48781 9.09882 2.53656C5.95033 2.61566 4.37608 2.65521 3.24495 3.79065C2.11382 4.92608 2.08114 6.45885 2.01576 9.52438C1.99474 10.5101 1.99475 11.4899 2.01577 12.4756C2.08114 15.5412 2.11383 17.0739 3.24496 18.2094C4.37608 19.3448 5.95033 19.3843 9.09883 19.4634C10.0691 19.4878 10.0345 19.5 11 19.5"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14 14.5L17.5 18M17.5 18L21 21.5M17.5 18L14 21.5M17.5 18L21 14.5"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <Typography color={theme.palette.secondary.contrastText}>No tienes mensajes!</Typography>
              </Box>
            </Box>
          </Box>
        </div>
      </Box>
    </Box>
  );
};

export default Notification;
