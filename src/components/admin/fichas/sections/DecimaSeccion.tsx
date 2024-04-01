
import { Box, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react'
import Datatable from '../../datatable/Datatable';

const DecimaSeccion = () => {
    const theme = useTheme();
    const [dataRows, setDataRows] = useState<any[]>([]);

    const columns = [
        {
            field:'desecho',
            headerName:'Desecho',
            headerClassName:'header-grid',
            width:250
        },
        {
            field:'destinoFinal',
            headerName:'Destino Final',
            headerClassName:'header-grid',
            width:746
        },
    ]
  return (
    <Box sx={{display:'flex',flexDirection:'column',gap:'1rem'}}>
    <Typography variant="h6" color={theme.palette.secondary.light}>Manejo de residuos</Typography>
    <Datatable columns={columns} rows={dataRows} />
    </Box>
  )
}

export default DecimaSeccion