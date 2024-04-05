'use client'

import ProtectedPage from "@/middleware/ProtectedPage";
import React from "react";
import BotonFlotante from "@/components/BotonFlotante";
import { Box, Grid } from "@mui/material";
import EfectivityData from "@/components/admin/overview/sections/EfectivityData";
import FichasDetailData from "@/components/admin/overview/sections/FichasDetailData";
import BarChartR from "@/components/admin/charts/BarChart";
import CircleChart2 from "@/components/admin/charts/CircleChart2";
import BarSection from "@/components/admin/reports/BarSection";
import CircleSection from "@/components/admin/reports/CircleSection";


const Reports = () => {
  return (
   <Box>
          <Grid sx={{marginBottom:'1rem',marginTop:'2rem'}} container spacing={1.5} justifyContent="center">
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

            <Grid item sm={8} xs={12}>
              <div className="borde-card cont-target">
                <BarSection/>
              </div>
            </Grid>

            <Grid item sm={4} xs={12}>
              <div className="borde-card cont-target">
                <CircleSection/>
              </div>
            </Grid>
          </Grid>
        </Grid>
          </Grid>
   </Box>
  );
};

export default Reports;
