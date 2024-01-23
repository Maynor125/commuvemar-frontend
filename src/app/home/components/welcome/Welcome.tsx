'use client'
import React from 'react'
import Link from "next/link";
import Image from "next/image";
import ImagenHome from '../../../../../public/images/home/imagen-welcome.png'
import './Welcome.css'
import { Box, useTheme } from '@mui/material';

const Welcome = () => {
   const theme = useTheme()
  return (
     <Box component='section' bgcolor={theme.palette.background.default} id='home' className='welcome-header'>
        <div className="container welcome-header-container grid">
            <div className="welcome-hader-left">
            <h4>¡Bienvenido a Coomuvemar!</h4>
               <h1>Obten el mejor cacao   con certificaciones <span>activas.</span> </h1>
               <p>Velamos por el bienestar económico y social de nuestros asociados, y brindamos servicios y productos de calidad para nuestros clientes!</p>
               <div className="botones-welcome-header">
                 <Link className='boton-base btn-welcome-header-1 boton-welcome-header' href="#contact">Forma parte de nosostros</Link>
               </div>
            </div>
            <div className="welcome-header-rigth">
              <div className="contenedor-img">
                 <Image alt='imagen home' className='imagen-home' src={ImagenHome}/>
              </div> 
            </div>
        </div>
     </Box>
  )
}

export default Welcome