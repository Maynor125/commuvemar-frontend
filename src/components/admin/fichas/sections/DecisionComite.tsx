import { Box, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import Datatable from '../../datatable/Datatable';

const DecisionComite = () => {
    const theme = useTheme();

    const [dataRows, setDataRows] = useState<any[]>([]);

    const columns = [
        {
            field:'aprobadoSinC',
            headerName:'Aprobado sin condiciones',
            headerClassName:'header-grid',
            width:332
        },
        {
            field:'aprobadoConC',
            headerName:'Aprobado con condiciones',
            headerClassName:'header-grid',
            width:332
        },
        {
            field:'sancionado',
            headerName:'Sancionado',
            headerClassName:'header-grid',
            width:332
        }, 
    ]

  return (
    <Box sx={{display:'flex',flexDirection:'column',gap:'1rem'}}>
       <Typography variant="h6" color={theme.palette.secondary.light}>Decisión del comité de aprobación y sanciones del SIC  </Typography>
      <Datatable columns={columns} rows={dataRows} />
        <Box sx={{display:'flex',alignItems:'center',marginTop:'4rem',justifyContent:'space-around'}}>
     <div style={{ position: 'relative' }}>
      <Typography color={theme.palette.secondary.contrastText}>
        Presidente
      </Typography>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, borderBottom: `1px dashed ${theme.palette.secondary.contrastText}` }} />
    </div>
     <div style={{ position: 'relative' }}>
      <Typography color={theme.palette.secondary.contrastText}>
        Vocal
      </Typography>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, borderBottom: `1px dashed ${theme.palette.secondary.contrastText}` }} />
    </div>
     <div style={{ position: 'relative' }}>
      <Typography color={theme.palette.secondary.contrastText}>
        Secretario
      </Typography>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, borderBottom: `1px dashed ${theme.palette.secondary.contrastText}` }} />
    </div>
     </Box>
    </Box>
  )
}

export default DecisionComite