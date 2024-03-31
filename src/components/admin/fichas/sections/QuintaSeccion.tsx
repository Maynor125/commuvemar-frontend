import { Box, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react'
import Datatable from '../../datatable/Datatable';

const QuintaSeccion = () => {
    const theme = useTheme();
    const [dataRows, setDataRows] = useState<any[]>([]);

    const columns = [
        {
            field:'productoAplicado',
            headerName:'Producto Aplicado',
            headerClassName:'header-grid',
            width:142
        },
        {
            field:'origen',
            headerName:'Origen',
            headerClassName:'header-grid',
            width:142
        },
        {
            field:'productoU',
            headerName:'ProductoUtilizado',
            headerClassName:'header-grid',
            width:142
        }, 
        {
            field:'cantidadMz',
            headerName:'Cantidad/Mz (Dosis)',
            headerClassName:'header-grid',
            width:142
        }, 
        {
            field:'vecesAño',
            headerName:'Veces por año',
            headerClassName:'header-grid',
            width:142
        }, 
        {
            field:'cultivo',
            headerName:'En que cultivo se utilizo',
            headerClassName:'header-grid',
            width:142
        }, 
        {
            field:'plagaEnfermedad',
            headerName:'Para que plaga o enfermedad',
            headerClassName:'header-grid',
            width:144
        }, 
    ]
  return (
    <Box sx={{display:'flex',flexDirection:'column',gap:'1rem'}}>
      <Typography variant="h6" color={theme.palette.secondary.light}>Control de plagas y enfermedades</Typography>
      <Datatable columns={columns} rows={dataRows} />
      </Box>
  )
}

export default QuintaSeccion