"use client";
import React, { useState } from "react";
import SearchInput from "@/components/SearchInput";
import { Box } from "@mui/material";
import ToogleButton from "@/components/theme/ToogleButton";
import Notification from "../notification/Notification";

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

  return <Box component='nav'>
   <SearchInput onChange={handleSearchChange}/>
   <div>
    <ToogleButton/>
    <Notification
    onClick={handleNotificationClick}
    hasNotifications={hasNotifications}
    />
   </div>
  </Box>;
};

export default NavbarAdmin;
