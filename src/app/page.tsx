'use client'
import Image from 'next/image'
import styles from './page.module.css'
import dynamic from 'next/dynamic' 

import { Links_home } from './home/data'
import { About, Banner, Contact, Footer, Service, Welcome } from './home/components'
import { Box, useTheme } from '@mui/material'
const Navbar= dynamic(()=> import('./home/components/navbar/Navbar'), { ssr: false })


export default function Home() { 
  const theme = useTheme()
  return (
    <Box component='main' bgcolor={theme.palette.background.default}>
      <Navbar pathNames={[Links_home.HOME,Links_home.ABOUT,Links_home.SERVICE,Links_home.CONTACT]}/>
      <Welcome/>
      <Banner/>
      <About/>
      <Service/>
      <Contact/>
      <Footer/>
    </Box>
  )
}
