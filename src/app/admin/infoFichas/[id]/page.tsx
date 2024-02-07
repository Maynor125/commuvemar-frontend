'use client'

import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'

/*
export async function generateMetadata({ params }:any) {
  const post= await getData(params.id)
  return {
    titulo: post.title,
    descripcion:post.desc,
  };
}*/

const page = () => {
  const theme = useTheme();
  return (
    <Box component={'main'}>
      <Box sx={{
        marginTop:'2rem'
      }}>
              <Typography sx={{
        color:theme.palette.secondary.light
      }} variant='h4'>
        Seccion de prueba
      </Typography>
      <Typography sx={{
        color:theme.palette.secondary.contrastText
      }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error rerum esse assumenda modi mollitia cum tempore delectus quas totam ab!
      </Typography>
      </Box>

      </Box>
  )
}

export default page