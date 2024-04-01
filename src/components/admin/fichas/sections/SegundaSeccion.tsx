import { Box, Typography, useTheme } from '@mui/material'
import React, { FC, useState } from 'react'
import Datatable from '../../datatable/Datatable';

interface Props {
 titulo: string;
}

const SegundaSeccion:FC<Props> = ({titulo}) => {
    const theme = useTheme();
    const [dataRows, setDataRows] = useState<any[]>([]);
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
            field:'cantidad / obserovacion',
            headerName:'Cantidad / Observacion',
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