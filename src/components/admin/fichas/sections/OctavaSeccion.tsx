
import { Box, Checkbox, FormControlLabel, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react'
import Datatable from '../../datatable/Datatable';
import { ReadOnlyTextField } from '../ReadOnlyInput';

const OctavaSeccion = () => {
    const theme = useTheme();
    const [dataRows, setDataRows] = useState<any[]>([]);

    const columns = [
        {
            field:'frecuenciaCorte',
            headerName:'Frecuencia de corte',
            headerClassName:'header-grid',
            width:250
        },
        {
            field:'herramientasUsadas',
            headerName:'Herramientas Usadas',
            headerClassName:'header-grid',
            width:250
        },
        {
            field:'materialEnvase',
            headerName:'Material usado para envase',
            headerClassName:'header-grid',
            width:295
        }, 
        {
            field:'precio',
            headerName:'Precio de compra',
            headerClassName:'header-grid',
            width:200
        }, 
    ]
  return (
    <Box sx={{display:'flex',flexDirection:'column',gap:'1rem'}}>
      <Typography variant="h6" color={theme.palette.secondary.light}>Informacion de parcelas</Typography>
      <Datatable columns={columns} rows={dataRows} />
      <Box  sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Box sx={{width:'50rem'}}>
          <Typography color={theme.palette.secondary.contrastText}>Mano de obra</Typography>
          <FormControlLabel sx={{color:theme.palette.secondary.contrastText}} control={<Checkbox  defaultChecked readOnly />} label="Familiar" />
          <FormControlLabel disabled control={<Checkbox />} label="Contratada" />
        </Box>
        <ReadOnlyTextField
          label="Precio"
          value="2000.00"
        />
        <ReadOnlyTextField
          label="Cantidad de dias"
          value="5"
        />
      </Box>
      </Box>
  )
}

export default OctavaSeccion