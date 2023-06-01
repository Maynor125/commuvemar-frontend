import Image from 'next/image'
import styles from './page.module.css'
import dynamic from 'next/dynamic' 

import { Links_home } from './home/data'
import { About, Banner, Contact, Footer, Service, Welcome } from './home/components'
const Navbar= dynamic(()=> import('./home/components/navbar/Navbar'), { ssr: false })
import { Toaster } from 'react-hot-toast'

export default function Home() { 
  return (
    <>
      <Toaster position='bottom-right' />
      <Navbar pathNames={[Links_home.HOME,Links_home.ABOUT,Links_home.SERVICE,Links_home.CONTACT]}/>
      <Welcome/>
      <Banner/>
      <About/>
      <Service/>
      <Contact/>
      <Footer/>
    </>
  )
}
