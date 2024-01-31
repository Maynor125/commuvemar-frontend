"use client";

import { Box, IconButton, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Image from "next/image";
import imgicon from "../../../../../public/images/admin/imgInspectors.png";

const InspectorsData = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <Box height={"100%"}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            color: theme.palette.secondary.light,
          }}
          variant="subtitle1"
        >
          Inspectores
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: ".3rem",
          }}
        >
          <Typography
            sx={{
              color: theme.palette.secondary.contrastText,
              fontSize: "12px",
            }}
          >
            Aug 25-Sept 25
          </Typography>
          <IconButton sx={{ color: theme.palette.secondary.contrastText }}>
            {!open ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ display: "flex", height: "85%" }}>
        <Box
          sx={{
            width: "8rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <Box>
            <Box sx={{ display: "flex",alignItems:'center',gap:'.3rem' }}>
              <Box sx={{
                width:'9px',
                height: '9px',
                backgroundColor:'#4FBD55',
                borderRadius:'50%'
              }} className="circle"></Box>
              <Typography
                sx={{
                  color: theme.palette.secondary.contrastText,
                  fontSize:'14px'
                }}
              >
                Activo
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ color: theme.palette.secondary.light,fontWeight:600 }}>
              8
            </Typography>
          </Box>
          <Box>
            <Box sx={{ display: "flex",alignItems:'center',gap:'.3rem' }}>
            <Box sx={{
                width:'9px',
                height: '9px',
                backgroundColor:'#E83D21',
                borderRadius:'50%'
              }} className="circle"></Box>
              <Typography
                sx={{
                  color: theme.palette.secondary.contrastText,
                  fontSize:'14px'
                }}
              >
                Inactivo
              </Typography>
            </Box>
            <Typography variant="h6"  sx={{ color: theme.palette.secondary.light,fontWeight:600 }}>
              6
            </Typography>
          </Box>
          <Box>
            <Box sx={{ display: "flex",alignItems:'center',gap:'.3rem' }}>
            <Box sx={{
                width:'9px',
                height: '9px',
                backgroundColor:'#26A4DA',
                borderRadius:'50%'
              }} className="circle"></Box>
              <Typography
                sx={{
                  color: theme.palette.secondary.contrastText,
                  fontSize:'14px'
                }}
              >
                Total
              </Typography>
            </Box>
            <Typography variant="h6"  sx={{ color: theme.palette.secondary.light,fontWeight:600 }}>
              7
            </Typography>
          </Box>
        </Box>
        <Box sx={{}}>
          <Image className="imglustracion" alt="imglustracion" src={imgicon} />
        </Box>
      </Box>
    </Box>
  );
};

export default InspectorsData;
