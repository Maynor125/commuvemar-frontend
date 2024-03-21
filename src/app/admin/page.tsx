import Welcome from "@/components/admin/overview/Welcome";
import ProtectedPage from "@/middleware/ProtectedPage";
import { Box, Grid, Paper } from "@mui/material";
import React from "react";

import "./styles.css";
import GeneralData from "@/components/admin/overview/sections/GeneralData";
import InspectorsData from "@/components/admin/overview/sections/InspectorsData";
import EfectivityData from "@/components/admin/overview/sections/EfectivityData";
import FichasDetailData from "@/components/admin/overview/sections/FichasDetailData";
import BotonFlotante from "@/components/BotonFlotante";


const OverView = () => {
  return (
    <main>
      <Welcome />
      <Grid sx={{marginBottom:'1rem'}} container spacing={1.5} justifyContent="center">
        {/* Primera fila */}
        <Grid item sm={8} xs={12}>
          <div className="borde-card cont-target">
            <GeneralData/>
          </div>
        </Grid>
        <Grid item sm={4} xs={12}>
          <div className="borde-card cont-target">
            <InspectorsData/>
          </div>
        </Grid>

        {/* Segunda fila */}
        <Grid item xs={12}>
          {/* Contenedor de dos columnas */}
          <Grid container spacing={1.5}>
            {/* Primera columna */}
            <Grid item sm={4} xs={12}>
              <div className="borde-card cont-target">
                <EfectivityData/>
              </div>
            </Grid>

            {/* Segunda columna */}
            <Grid item sm={8} xs={12}>
              <div className="borde-card cont-target">
                <FichasDetailData/>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <BotonFlotante/>
    </main>
  );
};

export default OverView;
