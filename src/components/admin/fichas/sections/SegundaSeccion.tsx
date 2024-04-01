import { Box, Typography, useTheme } from '@mui/material'
import React, { FC, useState } from 'react'
import Datatable from '../../datatable/Datatable';

interface Props {
 titulo: string;
 traeCantidad:boolean;
}

const SegundaSeccion:FC<Props> = ({titulo,traeCantidad}) => {
    const theme = useTheme();
    const [dataRows, setDataRows] = useState<any[]>([]);
    const ObservacionField = traeCantidad ? 'cantidad / observacion' : 'observacion'
    const ObservacionName = traeCantidad ? 'Cantidad / Observacion' : 'Observacion'
    const columns = [
        {
            field:'descripcion',
            headerName:'Descripcion',
            headerClassName:'header-grid',
        },
        {
            field:'realizacion',
            headerName:'Realizacion',
            headerClassName:'header-grid',
            width:120
        },
        {
            field:ObservacionField,
            headerName:ObservacionName,
            headerClassName:'header-grid',
            width:400
        }, 
    ]
  return (
    <Box sx={{display:'flex',flexDirection:'column',gap:'1rem'}}>
      <Typography variant="h6" color={theme.palette.secondary.light}>{titulo}</Typography>
      <Datatable columns={columns} rows={dataRows} />
      </Box>
  )
}

export default SegundaSeccion