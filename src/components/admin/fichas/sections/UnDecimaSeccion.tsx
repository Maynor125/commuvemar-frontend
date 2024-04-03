
import { Box, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react'
import Datatable from '../../datatable/Datatable';

const UnDecimaSeccion = () => {
    const theme = useTheme();
    const [dataRows, setDataRows] = useState<any[]>([]);
    const columns = [
        {
            field:'aspecto',
            headerName:'Aspecto',
            headerClassName:'header-grid',
            width:600
        },
        {
            field:'respuesta',
            headerName:'Respuesta',
            headerClassName:'header-grid',
            width:95
        },
        {
            field:'obserovacion',
            headerName:'Observacion',
            headerClassName:'header-grid',
            width:300
        }, 
    ]
  return (
    <Box sx={{display:'flex',flexDirection:'column',gap:'1rem'}}>
    <Typography variant="h6" color={theme.palette.secondary.light}>Resposabilidad social</Typography>
    <Datatable columns={columns} rows={dataRows} />
    </Box>
  )
}

export default UnDecimaSeccion