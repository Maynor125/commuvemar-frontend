import Image from 'next/image'
import styles from './page.module.css'

import { Links_home } from './home/data'
import { About, Banner, Contact, Footer, Navbar, Service, Welcome } from './home/components'

export default function Home() {
  return (
    <>
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
