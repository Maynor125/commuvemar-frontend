'use client'

import { Box, Typography, useTheme } from '@mui/material'
import Image from 'next/image';
import React from 'react'
import CircleG from '../../../../../public/images/admin/imgCircleG.png'
import CircleEfectivityChart from '../../charts/CircleChart';

const EfectivityData = () => {
    const theme = useTheme();
  return (
    <Box>
      <Box sx={{
        display: 'flex',
        justifyContent:'space-between',
        alignItems: 'center',
      }}>
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
        </Box>
        
        <Typography variant='h5' sx={{
            color:'#00A2DC',
            fontWeight: 600
        }}>
            + 20
        </Typography>
      </Box>
        <Box sx={{width:'100%',display:'flex',justifyContent:'center',marginTop:'1rem'}}>
            <CircleEfectivityChart percentage={80}/>
        </Box>
    </Box>
  )
}

export default EfectivityData