'use client'

import React, { useState } from 'react'
import { Services } from '../../data'
import Card from '@/components/Card'
import Image from 'next/image'
import './Service.css'
import { Box, useTheme } from '@mui/material'


const Service = () => {
   const theme = useTheme();
  return (
    <Box component='section' bgcolor={theme.palette.background.default} id='services' className='service'>
       <div className="container service-container">
           <h2>Nuestros servicios</h2>
           <p>Somos una Cooperativa consolidada a nivel organizativo y empresarial, que pretende ser un ejemplo a nivel nacional por su nivel productivo, aporte social, económico y ambiental.
</p>
           <div className="card-container">
           {
                Services.map(({id,icon,title,text}) =>
                {
                   return (
                      <Card className="service-card" key={id}>
                           <Image className='card-image' alt={title} src={icon}/>
                           <h4>{title}</h4>
                           <p>{text}</p>
                      </Card>
                   )
                })
            }
           </div>
       </div>
    </Box>
  )
}

export default Service