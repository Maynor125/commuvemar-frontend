'use client'

import ProtectedPage from "@/middleware/ProtectedPage";
import React from "react";
import BotonFlotante from "@/components/BotonFlotante";
import { Box, Grid } from "@mui/material";
import EfectivityData from "@/components/admin/overview/sections/EfectivityData";
import FichasDetailData from "@/components/admin/overview/sections/FichasDetailData";

const Reports = () => {
  return (
   <Box>
          <Grid sx={{marginBottom:'1rem'}} container spacing={1.5} justifyContent="center">
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
   </Box>
  );
};

export default Reports;
