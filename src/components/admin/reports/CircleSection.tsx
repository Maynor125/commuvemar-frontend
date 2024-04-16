import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import CircleChart2 from '../charts/CircleChart2';

const CircleSection = () => {
    const theme = useTheme();
  return (
    <Box height={"100%"} overflow='hidden'>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            color: theme.palette.secondary.light,
          }}
          variant="subtitle1"
        >
          Otros datos</Typography>
          <Typography variant='h5' sx={{
            color:'#4FBD55',
            fontWeight: 600
        }}>
        + 5
        </Typography>
          </Box >
          <Box sx={{marginTop:'3rem'}}>
                  <CircleChart2/>
          </Box>
      
          </Box>
  )
}

export default CircleSection