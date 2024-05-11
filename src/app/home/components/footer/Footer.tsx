"use client";

import React from "react";
import "./Footer.css";

import ImagenFooter1 from "../../../../../public/images/home/imagenFooter1.jpg";
import ImagenFooter2 from "../../../../../public/images/home/imagenFooter2.jpeg";
import { FaFacebookF } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import Logo from "../../../../../public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Box, Divider, Typography, useTheme } from "@mui/material";

const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      component="footer"
      sx={{ bgcolor: theme.palette.background.default }}
      className="footer"
    >
      <div className="container footer-container">
        <Divider />
        <div className="cont-footer-central">
          <div className="columna1-footer">
            <div className="cont-logo">
              <Link href="/">
                {" "}
                <Image src={Logo} alt="Logotipo" />
              </Link>
            </div>
            <p>
              Velamos por el cumplimiento de normas, requisitos y estándares
              productivos, sociales y ambientales para la producción de cacao.
            </p>
          </div>
          <div className="columna2-footer">
            <Typography
              sx={{ fontWeight: 700 }}
              variant="subtitle1"
              color={theme.palette.secondary.light}
            >
              Siguenos aqui
            </Typography>
            <div className="cont-media">
              <Link href="https://es-la.facebook.com/" className="media">
                <FaFacebookF className="icon" />
              </Link>
              <Link href="https://www.instagram.com/" className="media">
                <AiFillInstagram className="icon" />
              </Link>
              <Link href="https://twitter.com/login" className="media">
                <AiOutlineTwitter className="icon" />
              </Link>
            </div>
          </div>
          <div className="columna3-footer">
            <div className="imagen-cont">
              <div className="imageOverlay">
                <p className="infoImg">Corta de cacao</p>
              </div>
              <Image className="img-f" src={ImagenFooter1} alt="ilustracion1" />
            </div>
            <div className="imagen-cont">
            <div className="imageOverlay">
                <p className="infoImg">Acopio de cacao</p>
              </div>
              <Image className="img-f" src={ImagenFooter2} alt="ilustracion2" />
            </div>
          </div>
        </div>
        <div className="pie-de-pagina">
          <Typography color={theme.palette.secondary.contrastText}>
            Desarrollada por{" "}
            <Link
              className="a-active link-dev"
              href="https://maynor-padilla.netlify.app/"
            >
              Caridevs
            </Link>{" "}
          </Typography>
          <div className="creditos">
            <Typography color={theme.palette.secondary.contrastText}>
              © 2023 - 2024 COOMUVEMAR.
            </Typography>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Footer;
