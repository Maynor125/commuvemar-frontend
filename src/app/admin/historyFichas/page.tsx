"use client";

import CardFicha2 from "@/components/admin/fichas/CardFicha2";
import ProtectedPage from "@/middleware/ProtectedPage";
import { Box, Divider, IconButton, InputBase, Paper, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Pagination from "@/components/admin/pagination/Pagination";
import { Fichas } from "@/data/admin/fichas";
import SearchIcon from '@mui/icons-material/Search';

import './Style.css'
import NoResult from "@/components/noResult";


const HistoryFichas = () => {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [fichasPerPage] = useState(6);
  const indexOfLastFicha = currentPage * fichasPerPage;
  const indexOfFirstFicha = indexOfLastFicha - fichasPerPage;
  const currentFichas = Fichas.slice(indexOfFirstFicha, indexOfLastFicha);
  const [filteredFichas, setFilteredFichas] = useState(Fichas);
  const [searchQuery, setSearchQuery] = useState("");

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const results = Fichas.filter((ficha) => {
      return ficha.nombre.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredFichas(results);
    setCurrentPage(1);
  }, [searchQuery]);


  return (
    <Box component="main">
      <Box sx={{width:'100%',background:theme.palette.background.paper,borderRadius:'6px',marginBottom:'1rem',marginTop:'1.5rem'}}>
        <Box sx={{height:'4.5rem',display:'flex',justifyContent:'space-between',alignItems:'center',marginLeft:'2.5rem'}}>
         <Typography sx={{color:theme.palette.secondary.light}} variant="h5">Historial de fichas</Typography>
         <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
       <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Busca fichas por inspector"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={handleSearch}
      />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
        </Box>
        <Divider/>
        <Box sx={{margin:'1.5rem',padding:'1rem',display:"flex",justifyContent:'space-between',flexWrap:'wrap',gap:'1.5rem'}}>
          {
            filteredFichas.length > 0 ?
            filteredFichas.slice(indexOfFirstFicha, indexOfLastFicha).map((fichas)=>(
                       <CardFicha2 key={fichas.id} ficha={fichas}/>
            )): <NoResult/>
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
