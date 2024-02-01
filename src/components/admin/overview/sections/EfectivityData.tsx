'use client'

import { Box, Typography, useTheme } from '@mui/material'
import Image from 'next/image';
import React from 'react'
import CircleG from '../../../../../public/images/admin/imgCircleG.png'

const EfectivityData = () => {
    const theme = useTheme();
  return (
    <Box>
         <Typography
          sx={{
            fontWeight: 600,
            color: theme.palette.secondary.light,
          }}
          variant="subtitle1"
        >
          Efectividad
        </Typography>
        <Typography sx={{
            color: theme.palette.secondary.contrastText,
            fontSize:'11px'
        }}>
        Total Fichas analizadas
        </Typography>
        <Typography variant='h5' sx={{
            color:'#00A2DC',
            fontWeight: 600
        }}>
            + 20
        </Typography>
        <Typography sx={{
            color: theme.palette.secondary.contrastText,
            fontSize:'14px'
        }}>
          El beneficio es un 48% más que el año pasado
        </Typography>
        <Box sx={{width:'100%',display:'flex',justifyContent:'center',marginTop:'1rem'}}>
            <Image src={CircleG} alt='img temporal'/>
        </Box>
    </Box>
  )
}

export default EfectivityData