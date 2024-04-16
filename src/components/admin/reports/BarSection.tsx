import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import BarChartR from '../charts/BarChart';

const BarSection = () => {
    const theme = useTheme();
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            color: theme.palette.secondary.light,
          }}
          variant="subtitle1"
        >
          Otra seccion de las fichas
        </Typography>
      </Box>
      <Box>
         <BarChartR/>
      </Box>
      </Box>
  )
}

export default BarSection