import { Box, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react'
import Datatable from '../../datatable/Datatable';

const SextaSeccion = () => {
    const theme = useTheme();
    const [dataRows, setDataRows] = useState<any[]>([]);

    const columns = [
        {
            field:'nombreAbono',
            headerName:'Nombre del abono',
            headerClassName:'header-grid',
            width:200
        },
        {
            field:'cantidadAplicada',
            headerName:'Cantidad aplicada',
            headerClassName:'header-grid',
            width:200
        },
        {
            field:'origen',
            headerName:'Origen',
            headerClassName:'header-grid',
            width:200
        }, 
        {
            field:'mesAplicado',
            headerName:'Mes en que aplico',
            headerClassName:'header-grid',
            width:199
        }, 
        {
            field:'cualCultivo',
            headerName:'A que cultivo',
            headerClassName:'header-grid',
            width:197
        }, 
    ]
  return (
    <Box sx={{display:'flex',flexDirection:'column',gap:'1rem'}}>
    <Typography variant="h6" color={theme.palette.secondary.light}>Aplicación de Fertilizantes Edáficos y Foliares</Typography>
    <Datatable columns={columns} rows={dataRows} />
    </Box>
  )
}

export default SextaSeccion