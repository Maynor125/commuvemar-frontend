import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'

const DictamenFinal = () => {
    const theme = useTheme();
  return (
    <Box>
     <Typography variant='h6' color={theme.palette.secondary.light}>
        Dictamen final de la inspeccion
     </Typography>
     <Typography color={theme.palette.secondary.contrastText}>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, eius porro? Numquam eveniet obcaecati consequatur commodi quasi atque, cupiditate odio vel eos alias at provident tempore officia voluptatum sint quod aliquam. Amet autem nam error tenetur accusamus omnis in beatae. Assumenda, distinctio sunt vel modi facilis dolor tempora ipsa asperiores.
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, eius porro? Numquam eveniet obcaecati consequatur commodi quasi atque, cupiditate odio vel eos alias at provident tempore officia voluptatum sint quod aliquam. Amet autem nam error tenetur accusamus omnis in beatae. Assumenda, distinctio sunt vel modi facilis dolor tempora ipsa asperiores.
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, eius porro? Numquam eveniet obcaecati consequatur commodi quasi atque, cupiditate odio vel eos alias at provident tempore officia voluptatum sint quod aliquam. Amet autem nam error tenetur accusamus omnis in beatae. Assumenda, distinctio sunt vel modi facilis dolor tempora ipsa asperiores.
     </Typography>
     </Box>
  )
}

export default DictamenFinal