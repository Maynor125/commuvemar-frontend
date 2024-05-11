"use client";
import React, { useState } from "react";
import SearchInput from "@/components/SearchInput";
import { Box, Drawer, IconButton, useTheme } from "@mui/material";
import ToogleButton from "@/components/theme/ToogleButton";
import Notification from "../notification/Notification";
import ProfilePreview from "../profile/ProfilePreview";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SideBar from "../sidebar/SideBar";
import { PathsSideBar } from "@/routes/sideInfo";

const NavbarAdmin: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    // Realiza las acciones de búsqueda según necesites con el valor actualizado
  };

  //------------------------------------------------------------------
  const [hasNotifications, setHasNotifications] = useState<boolean>(true);
  const handleNotificationClick = () => {
    // Agrega la lógica para manejar la apertura de las notificaciones
    setHasNotifications(false); // Establece 'hasNotifications' a 'false' cuando se hace clic
  };

  const theme = useTheme();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Box
      component="nav"
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: ".5rem",
      }}
    >
      <IconButton
        edge="start"
        onClick={handleDrawerOpen}
        sx={{
          mr: 2,
          display: { md: "none" },
          color: theme.palette.secondary.dark,
        }}
      >
        <MenuRoundedIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerClose}
        sx={{
          "& .MuiDrawer-paper": {
            width: "220px",
            paddingTop:'1rem'
          },
          display:"flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <SideBar paths={PathsSideBar} />
      </Drawer>
      <SearchInput onChange={handleSearchChange} />
      <Box sx={{ display: "flex", alignItems: "center", gap: ".4rem" }}>
        <ToogleButton />
        <Notification
          onClick={handleNotificationClick}
          hasNotifications={hasNotifications}
        />
        <ProfilePreview avatarSrc="/images/assets/userPicture.jpg" />
      </Box>
    </Box>
  );
};

export default NavbarAdmin;
