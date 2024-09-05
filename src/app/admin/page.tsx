"use client";

import Welcome from "@/components/admin/overview/Welcome";
import ProtectedPage from "@/middleware/ProtectedPage";
import { Box, Grid, Paper, Typography, useTheme } from "@mui/material";
import React from "react";

import "./styles.css";
import GeneralData from "@/components/admin/overview/sections/GeneralData";
import InspectorsData from "@/components/admin/overview/sections/InspectorsData";
import EfectivityData from "@/components/admin/overview/sections/EfectivityData";
import FichasDetailData from "@/components/admin/overview/sections/FichasDetailData";
import BotonFlotante from "@/components/BotonFlotante";
import ListActivity from "@/components/admin/overview/ListActivity";
import CardsUltimate from "@/components/admin/overview/CardsUltimate";
import Image from "next/image";
import imgPhone from "../../../public/images/admin/cellimg.png";
import { useRouter } from "next/navigation";

const OverView = () => {
  const theme = useTheme();
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/admin/historyFichas')
  }
  return (
    <main>
      <Grid
        sx={{ marginBottom: "1rem" }}
        container
        spacing={1.5}
        justifyContent="center"
      >
        {/* Contenedor de las cartas */}
        <Grid item xs={12}>
          <CardsUltimate />
        </Grid>

        {/* Contenedor de Inspector Data y Carta de Publicidad */}
        <Grid item xs={12} md={12} lg={4}>
          <Grid container spacing={1.5}>
            <Grid item xs={12} md={6} lg={12}>
              <div className="borde-card cont-target">
                <InspectorsData />
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <div className="borde-card cont-target">
                <Box sx={{ height: "9.5rem", overflow: "hidden" }}>
                  <Image
                    className="imgPhone"
                    height={250}
                    alt="imagen de telefono"
                    src={imgPhone}
                  />
                </Box>
                <Typography
                  sx={{ marginY: ".5rem", textAlign: "center" }}
                  color={theme.palette.secondary.contrastText}
                >
                  Lorem ipsum dolor sit, amet consectetur.
                </Typography>
                <button
                  style={{ width: "100%", padding: "0 auto" }}
                  className="btn-save"
                  onClick={handleNavigate}
                >
                  Revisa todo a detalle
                </button>
              </div>
            </Grid>
          </Grid>
        </Grid>

        {/* Contenedor del Listado de Fichas */}
        <Grid item xs={12} md={12} lg={8}>
          <div className="borde-card">
            <ListActivity />
          </div>
        </Grid>
      </Grid>
      <BotonFlotante />
    </main>
  );
};

export default OverView;
