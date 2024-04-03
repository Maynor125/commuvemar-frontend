import { Box, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react'
import Datatable from '../../datatable/Datatable';

const CuartaSeccion = () => {
    const theme = useTheme();
    const [dataRows, setDataRows] = useState<any[]>([]);

    const columns = [
        {
            field:'plagasEnfermedadaes',
            headerName:'Plagas y enfermedades',
            headerClassName:'header-grid',
            width:250
        },
        {
            field:'percepcionIntensidad',
            headerName:'Percepción de la intensidad de ataque',
            headerClassName:'header-grid',
            width:746
        },
    ]

  return (
    <Box sx={{display:'flex',flexDirection:'column',gap:'1rem'}}>
    <Typography variant="h6" color={theme.palette.secondary.light}>Manejo de plagas y enfermedades</Typography>
    <Datatable columns={columns} rows={dataRows} />
    </Box>
  )
}

export default CuartaSeccion