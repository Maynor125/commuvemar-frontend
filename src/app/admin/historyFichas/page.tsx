"use client";

import CardFicha2 from "@/components/admin/fichas/CardFicha2";
import ProtectedPage from "@/middleware/ProtectedPage";
import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Pagination from "@/components/admin/pagination/Pagination";
import { Fichas } from "@/data/admin/fichas";
import SearchIcon from "@mui/icons-material/Search";

import "./Style.css";
import NoResult from "@/components/NoResult";
import Map from "@/components/map/Map";
import ModalMapa from "@/components/admin/fichas/ModalMapa";
import { useDispatch, useSelector } from "react-redux";
import { updateValueMapa } from "@/redux/features/mapaModalSlice";
import { RootState } from "@/redux/store/store";
import { updateValueFichas } from "@/redux/features/fichaSlice";

const HistoryFichas = () => {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [fichasPerPage] = useState(6);
  const indexOfLastFicha = currentPage * fichasPerPage;
  const indexOfFirstFicha = indexOfLastFicha - fichasPerPage;
  const currentFichas = Fichas.slice(indexOfFirstFicha, indexOfLastFicha);
  const [filteredFichas, setFilteredFichas] = useState(Fichas);
  const [searchQuery, setSearchQuery] = useState("");
  const [mostrarFAnalisadas, setMostrarFAnalisadas] = useState(false);

  const dispatch = useDispatch();
  const fichasState = useSelector((state: RootState) => state.fichas);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    let results = Fichas.filter((ficha) => {
      return ficha.nombre.toLowerCase().includes(searchQuery.toLowerCase());
    });
    if(fichasState.AlanizadaFichas){
      results = results.filter((ficha) => ficha.analizada)
    }
    setFilteredFichas(results);
    setCurrentPage(1);
  }, [searchQuery,fichasState]);

  const latitude = 13.7177027;
  const longitude = -84.7721508;

  const handleOpenModalMapa = () => {
    dispatch(
      updateValueMapa({
        openM: true,
        latitud: latitude,
        longitud: longitude,
      })
    );
  };

  const changeFAanlisadas = () => {
    setMostrarFAnalisadas(!mostrarFAnalisadas);
    dispatch(
      updateValueFichas({
        AlanizadaFichas: !fichasState.AlanizadaFichas,
      })
    );
  };

  return (
    <Box component="main">
      <Box
        sx={{
          width: "100%",
          background: theme.palette.background.paper,
          borderRadius: "6px",
          marginBottom: "1rem",
          marginTop: "1.5rem",
        }}
      >
        <Box
          sx={{
            height: "4.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: "2.5rem",
          }}
        >
          <Typography
            sx={{ color: theme.palette.secondary.light }}
            variant="h5"
          >
            Historial de fichas
          </Typography>
          <Box sx={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <Tooltip
              title={
                fichasState.AlanizadaFichas
                  ? "Mostrar todas las fichas"
                  : "Mostrar las fichas analizadas"
              }
            >
              <div className="check">
                <input
                  checked={fichasState.AlanizadaFichas}
                  onChange={changeFAanlisadas}
                  id="check"
                  type="checkbox"
                />
                <label htmlFor="check"></label>
              </div>
            </Tooltip>
            <TextField
              sx={{ marginRight: "2.5rem", width: "18rem" }}
              onChange={handleSearch}
              variant="standard"
              placeholder="Buscar ficha por inspector"
              InputProps={{
                disableUnderline: true, // Deshabilita el borde inferior
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{
            margin: "1.5rem",
            padding: "1rem",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          {filteredFichas.length > 0 ? (
            filteredFichas
              .slice(indexOfFirstFicha, indexOfLastFicha)
              .map((fichas) => (
                <CardFicha2
                  key={fichas.id}
                  ficha={fichas}
                  onClick={handleOpenModalMapa}
                />
              ))
          ) : (
            <NoResult />
          )}
        </Box>
        <Box
          sx={{
            mt: "1rem",
            textAlign: "center",
            color: theme.palette.secondary.contrastText,
          }}
        >
          <Pagination
            fichasPerPage={fichasPerPage}
            totalFichas={Fichas.length}
            paginate={paginate}
          />
        </Box>
      </Box>
      <ModalMapa description="Esta es la localizacion exacta donde se lleno la ficha" />
    </Box>
  );
};

export default HistoryFichas;
