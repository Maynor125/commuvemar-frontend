import React, { useState } from "react";
import { Services } from "../../data";
import Card from "@/components/Card";
import Image from "next/image";
import "./Service.css";
import { Box, Typography, useTheme } from "@mui/material";

const Service = () => {
  const theme = useTheme();
  return (
    <Box
      component="section"
      bgcolor={theme.palette.background.default}
      id="services"
      className="service"
    >
      <div className="container service-container">
        <Typography variant="h2" color={theme.palette.secondary.light}>
          Nuestros servicios
        </Typography>
        <Typography color={theme.palette.secondary.light}>
          Somos una Cooperativa consolidada a nivel organizativo y empresarial,
          que pretende ser un ejemplo a nivel nacional por su nivel productivo,
          aporte social, económico y ambiental.
        </Typography>
        <div className="card-container">
          {Services.map(({ id, icon, title, text }) => {
            return (
              <Card
                className="box-with-shadow  service-card"
                key={id}
              >
                <Image className="card-image" alt={title} src={icon} />
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700 }}
                  color={theme.palette.secondary.light}
                  className="service-card-title"
                >
                  {title}
                </Typography>
                <p>{text}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </Box>
  );
};

export default Service;
