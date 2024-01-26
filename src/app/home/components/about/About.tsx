
import Image from "next/image";
import React from "react";
import "./About.css";
import ImagenAbout from "../../../../../public/images/home/imagen-about-2.jpeg";
import Link from "next/link";
import IconoCacao from "../../../../../public/images/home/icono-cacao.png";
import { Box, Typography, useTheme } from "@mui/material";

const About = () => {
  const theme = useTheme();
  return (
    <Box
      component="section"
      bgcolor={theme.palette.background.default}
      id="about"
      className="about"
    >
      <div className="container about-container">
        <div className="about-container-left">
          <h4>¿Quienes somos?</h4>
          <Typography variant="h2" color={theme.palette.secondary.light}>
            Como coomuvemar
          </Typography>

          <Typography
            color={theme.palette.secondary.light}
            className="about-container-left-text"
          >
            Contamos con la certificación, que es un proceso de producir de
            manera sostenible con el Medio Ambiente, gestión de calidad, gestión
            ambiental además de que la certificación es una garantía para los
            consumidores y coomuvemar cuenta con dos.
          </Typography>

          <Box
            component="div"
            className="box-with-shadow  targeta-about"
            sx={{
              "&:hover": {
                backgroundColor: theme.palette.background.paper, // Color de fondo al pasar el ratón sobre el box
              },
            }}
          >
            <div className="part-superior">
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700 }}
                color={theme.palette.secondary.light}
              >
                Certificado Rainforest Alliance
              </Typography>
              <div className="icono">
                <Image alt="icono-cacao" src={IconoCacao} />
              </div>
            </div>
            <p>
              Ayuda a los agricultores a producir mejores cultivos, adaptarse al
              cambio climático, aumentar su productividad y reducir costos.
            </p>
          </Box>
          <Box component="div" className="box-with-shadow  targeta-about">
            <div className="part-superior">
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700 }}
                color={theme.palette.secondary.light}
              >
                Certificado organico
              </Typography>
              <div className="icono">
                <Image alt="icono-cacao" src={IconoCacao} />
              </div>
            </div>
            <p>
              Una herramienta que garantiza confianza al consumidor de que lo
              que está comprando es realmente de origen orgánico.
            </p>
          </Box>
          <Link href="#services" className="boton-base boton-about">
            Consulta...
          </Link>
        </div>
        <div className="about-container-rigth">
          <div className="cont-img">
            <Image
              src={ImagenAbout}
              className="imagen-about"
              alt="imagen de productores de cacao"
            />
            <Box component='div' className="box-with-shadow  mensaje-flotante" sx={{backgroundColor:theme.palette.background.default}}>
              <Typography variant="subtitle1"
                sx={{ fontWeight: 700 }}
                color={theme.palette.secondary.light}>¿En busca de ayuda?</Typography>
              <Typography variant="body2" className="mensaje-flotante-text" color={theme.palette.secondary.contrastText}>
                Contamos con tecnicos que le brindaran ayuda de manera amigable.
              </Typography>
            </Box>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default About;
