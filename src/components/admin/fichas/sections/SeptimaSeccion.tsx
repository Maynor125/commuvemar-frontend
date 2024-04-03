import { Box, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react'
import Datatable from '../../datatable/Datatable';

const SeptimaSeccion = () => {
    const theme = useTheme();
    const [dataRows, setDataRows] = useState<any[]>([]);
    const columns = [
        {
            field:'practica',
            headerName:'Practica',
            headerClassName:'header-grid',
            width:332
        },
        {
            field:'realizacion',
            headerName:'Realizacion',
            headerClassName:'header-grid',
            width:332
        },
        {
            field:'cantidad / obserovacion',
            headerName:'Cantidad / Observacion',
            headerClassName:'header-grid',
            width:332
        }, 
    ]
  return (
    <Box sx={{display:'flex',flexDirection:'column',gap:'1rem'}}>
    <Typography variant="h6" color={theme.palette.secondary.light}>Conservación de Suelos, Agua y Medio Ambiente</Typography>
    <Datatable columns={columns} rows={dataRows} />
    </Box>
  )
}

export default SeptimaSeccion