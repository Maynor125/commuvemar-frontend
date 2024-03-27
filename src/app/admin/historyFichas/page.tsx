"use client";

import CardFicha2 from "@/components/admin/fichas/CardFicha2";
import ProtectedPage from "@/middleware/ProtectedPage";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import Pagination from "@/components/admin/pagination/Pagination";
import { Fichas } from "@/data/admin/fichas";

import './Style.css'


const HistoryFichas = () => {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [fichasPerPage] = useState(6);
  const indexOfLastFicha = currentPage * fichasPerPage;
  const indexOfFirstFicha = indexOfLastFicha - fichasPerPage;
  const currentFichas = Fichas.slice(indexOfFirstFicha, indexOfLastFicha);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Box component="main">
      <Box sx={{width:'100%',background:theme.palette.background.paper,borderRadius:'6px',marginBottom:'1rem',marginTop:'1.5rem'}}>
        <Box sx={{height:'4rem',display:'flex',justifyContent:'space-between',alignItems:'center',marginLeft:'2.5rem'}}>
         <Typography sx={{color:theme.palette.secondary.light}} variant="h5">Historial de fichas</Typography>
        </Box>
        <Divider/>
        <Box sx={{margin:'1.5rem',padding:'1rem',display:"flex",justifyContent:'space-between',flexWrap:'wrap',gap:'1.5rem'}}>
          {
            currentFichas.map((fichas)=>(
                       <CardFicha2 key={fichas.id} ficha={fichas}/>
            ))
          }
        </Box>
        <Box sx={{ mt: '1rem', textAlign: 'center' }}>
        <Pagination fichasPerPage={fichasPerPage} totalFichas={Fichas.length} paginate={paginate} />
      </Box>
      </Box>
    </Box>
  );
};

export default HistoryFichas;
