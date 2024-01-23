"use client";
import React, { useState } from "react";
import SearchInput from "@/components/SearchInput";
import { Box } from "@mui/material";
import ToogleButton from "@/components/theme/ToogleButton";

const NavbarAdmin: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    // Realiza las acciones de búsqueda según necesites con el valor actualizado
  };
  return <Box component='nav'>
   <SearchInput onChange={handleSearchChange}/>
   <div>
    <ToogleButton/>
   </div>
  </Box>;
};

export default NavbarAdmin;
