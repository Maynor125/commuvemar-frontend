"use client";

import React, { useState, useEffect } from "react";
import Logo from "../../../../../public/images/logo.png";
import Image from "next/image";
import { Link_home } from "../../data";

import "./Navbar.css";

/* Iconos a usar en el navbar */
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ToogleButton from "../../../../components/theme/ToogleButton";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { useAppSelector } from "@/redux/store/store";
import { selectDarkMode } from "@/redux/features/themeSlice";
import Link from "next/link";


interface Props {
  pathNames: Link_home[]; 
}

function Navbar({ pathNames }: Props) {
  const [isNavShowing, setIsNavShowing] = useState<boolean>(false);
  const theme = useTheme();
  const [isSticky, setIsSticky] = useState<boolean>(false);

  //Codigo para manejar los links activos.
  const darkMode = useAppSelector(selectDarkMode);
  const esOscuro = darkMode ? true : false;

  const isSmallerThan1025 = useMediaQuery("(max-width: 1024px)");

   // Manejar el cambio de scroll
useEffect(() => {
  if (typeof window !== 'undefined') { // Check if we're on the client-side
    const scrollHeader = () => {
      if (window.scrollY >= 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', scrollHeader);
    return () => {
      window.removeEventListener('scroll', scrollHeader);
    };
  }
}, []);

  return (
    <Box
      component="nav"
      id="hea"
      className="header"
      sx={{ bgcolor: theme.palette.background.default, boxShadow: "none" }}
    >
      <div className="container nav-container">
        <div className="imagen">
          <Link href="/">
            <Image src={Logo} className="logo" alt="Logotipo" />
          </Link>
        </div>
        <div className={`fondo ${isNavShowing ? "fondo-a" : "fondo-i"}`}></div>
        <div
          className={`nav-part2 ${
            isNavShowing ? "nav-part2-active" : "nav-part2-desactive"
          }`}
        >
          <Box component='div' sx={{ bgcolor: isSmallerThan1025 ? theme.palette.background.paper:''}}
            className={`contenedor-nav ${
              isNavShowing ? "contenedor-nav-active" : "contenedor-nav-inactive"  
            }`}
          >
            <ul className="nav-list">
              {pathNames.map((pathName) => (
                <Link
                  className="nav-link"
                  key={pathName.path}
                  href={pathName.path}
                >
                  <Typography color={theme.palette.secondary.main}>
                    {pathName.name}
                  </Typography>
                </Link>
              ))}
            </ul>
            <div className={`part-1 ${isSmallerThan1025 ? 'bordes':''}`}>
              <div className={`dark-mode ${isSmallerThan1025 ? 'bordesb':''}` }>
                <Typography sx={{color:theme.palette.secondary.contrastText}}>Dark mode</Typography>
                <ToogleButton />
              </div>
              <Link className="boton-base btn-loginn" href="/login">
                Login
              </Link>
            </div>
          </Box>
        </div>
        {isSmallerThan1025 && (
          <IconButton
            className="btn-nav-toogle"
            onClick={() => setIsNavShowing((prev) => !prev)}
            sx={{ color: theme.palette.secondary.dark }}
          >
            <MenuRoundedIcon className="menu-icon" />
          </IconButton>
        )}
      </div>
    </Box>
  );
}

export default Navbar;
