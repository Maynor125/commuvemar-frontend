import { Box, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import Datatable from '../../datatable/Datatable'

const TerceraSeccion = () => {
    const theme = useTheme();
    const [dataRows, setDataRows] = useState<any[]>([]);

    const columns = [
        {
            field:'nombreParcela',
            headerName:'Nombre de parcela',
            headerClassName:'header-grid',
            width:250
        },
        {
            field:'areaEnMz',
            headerName:'Area en MZ',
            headerClassName:'header-grid',
            width:250
        },
        {
            field:'cultivo',
            headerName:'Cultivo',
            headerClassName:'header-grid',
            width:250
        }, 
        {
            field:'insumosUtilizados',
            headerName:'Insumos Actualizados',
            headerClassName:'header-grid',
            width:245
        }, 
    ]

  return (
    <Box sx={{display:'flex',flexDirection:'column',gap:'1rem'}}>
      <Typography variant="h6" color={theme.palette.secondary.light}>Informacion de parcelas</Typography>
      <Datatable columns={columns} rows={dataRows} />
      </Box>
  )
}

export default TerceraSeccion