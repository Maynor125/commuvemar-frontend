import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'

const Declaracion = () => {
    const theme = useTheme();
  return (
    <Box>
     <Typography variant='h6' color={theme.palette.secondary.light}>
        Declaracion:
     </Typography>
     <Typography color={theme.palette.secondary.contrastText}>
     El productor / Cooperativa abajo firmante declara su conformidad con todo lo expuesto en este documento y afirma que no ha aplicado ningún producto o procedimiento no señalado en el mismo.Además, acepto de antemano recibir cualquier visita de control interno y/o externo a su propiedad.
     </Typography>
     <Box sx={{display:'flex',alignItems:'center',marginTop:'4rem',justifyContent:'space-around'}}>
     <div style={{ position: 'relative' }}>
      <Typography color={theme.palette.secondary.contrastText}>
        Firma del productor
      </Typography>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, borderBottom: `1px dashed ${theme.palette.secondary.contrastText}` }} />
    </div>
     <div style={{ position: 'relative' }}>
      <Typography color={theme.palette.secondary.contrastText}>
        Firma del inspector interno
      </Typography>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, borderBottom: `1px dashed ${theme.palette.secondary.contrastText}` }} />
    </div>
     </Box>
    </Box>
  )
}

export default Declaracion