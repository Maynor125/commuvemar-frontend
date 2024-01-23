'use client'

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
import { Box, useTheme } from "@mui/material";


const Footer = () => {
  const theme = useTheme();
  return (
    <Box component='footer' sx={{bgcolor:theme.palette.background.default}}>
      <div className="container footer-container">
        <div className="linia"></div>
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
            <h4>Siguenos aqui</h4>
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
              <Image className="img-f" src={ImagenFooter1} alt="ilustracion1" />
            </div>
            <div className="imagen-cont">
              <Image className="img-f" src={ImagenFooter2} alt="ilustracion2" />
            </div>
          </div>
        </div>
        <div className="pie-de-pagina">
          <p>Desarrollada por <Link className="link-dev" href='https://maynor-padilla.netlify.app/'>Caridevs</Link> </p>
          <div className="creditos">
            <p>© 2023 - 2024 COOMUVEMAR.</p>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Footer;
