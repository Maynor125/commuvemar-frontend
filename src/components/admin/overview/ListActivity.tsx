"use client";
import {
  Avatar,
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ListActivityItem from "./ListActivityItem";
import { Ficha } from "@/types/ficha";
import { getAllFichas } from "@/services/fichas";


const ListActivity = () => {
  const theme = useTheme();
  const fontColor = theme.palette.secondary.light;
  const fontColor1 = theme.palette.secondary.contrastText;
  const [fichas,setFichas] = useState<Ficha[]>([]);
  const [filteredFichas, setFilteredFichas] = useState<Ficha[]>([]);

  const getAllFicha = async() =>{
    try {
      const response = await getAllFichas();
      if(response.data !== undefined){
        setFichas(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
   getAllFicha();
  },[]);

  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);

    // Filtrar las fichas según el periodo seleccionado
    const hoy = new Date();
    const periodo = Number(event.target.value);

    switch (periodo) {
      case 7: // Una semana
        const haceUnaSemana = new Date();
        haceUnaSemana.setDate(hoy.getDate() - 7);
        setFilteredFichas(
          fichas.filter((ficha) => ficha.createdAt && new Date(ficha.createdAt) >= haceUnaSemana)
        );
        break;
      case 30: // Un mes
        const haceUnMes = new Date();
        haceUnMes.setMonth(hoy.getMonth() - 1);
        setFilteredFichas(
          fichas.filter((ficha) => ficha.createdAt && new Date(ficha.createdAt) >= haceUnMes)
        );
        break;
      case 90: // 3 meses
        const haceTresMeses = new Date();
        haceTresMeses.setMonth(hoy.getMonth() - 3);
        setFilteredFichas(
          fichas.filter((ficha) => ficha.createdAt && new Date(ficha.createdAt) >= haceTresMeses)
        );
        break;
      case 180: // 6 meses
        const haceSeisMeses = new Date();
        haceSeisMeses.setMonth(hoy.getMonth() - 6);
        setFilteredFichas(
          fichas.filter((ficha) => ficha.createdAt && new Date(ficha.createdAt) >= haceSeisMeses)
        );
        break;
      default:
        setFilteredFichas(fichas); // Si no se selecciona ningún periodo, mostrar todas las fichas
        break;
    }
  };

  return (
    <Box sx={{padding:'1rem',height:'95vh',overflowY:'auto'}}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontWeight: 600 }} color={fontColor}>
          Fichas ingresadas
        </Typography>
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Time</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={age}
            label="Week"
            onChange={handleChange}
          >
            <MenuItem value={7}>Week</MenuItem>
            <MenuItem value={30}>Month</MenuItem>
            <MenuItem value={90}>3 Month</MenuItem>
            <MenuItem value={180}>6 Month</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Divider sx={{ marginTop:'1rem' }} />
      <Box>
        <ListActivityItem isRevised={true}/>
        <ListActivityItem isRevised={false}/>
        <ListActivityItem isRevised={true}/>
        <ListActivityItem isRevised={false}/>
        <ListActivityItem isRevised={true}/>
        <ListActivityItem isRevised={false}/>
        <ListActivityItem isRevised={true}/>
      </Box>
    </Box>
  );
};

export default ListActivity;
