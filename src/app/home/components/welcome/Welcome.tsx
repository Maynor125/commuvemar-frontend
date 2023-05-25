import React from 'react'
import Link from "next/link";
import Image from "next/image";
import ImagenHome from '../../../../../public/images/home/home-welcome.svg'
import './Welcome.css'

const Welcome = () => {
  return (
     <header id='home' className='welcome-header'>
        <div className="container welcome-header-container grid">
            <div className="welcome-hader-left">
            <h4>¡Bienvenido a Coomuvemar!</h4>
               <h1>Obten el mejor cacao   con sertificaciones <span>activas.</span> </h1>
               <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id quisquam, ad facere corrupti molestias repellat assumenda maiores magni natus perspiciatis illo!</p>
               <div className="botones-welcome-header">
                 <Link className='boton-base btn-welcome-header-1 boton-welcome-header' href="#contacto">Forma parte de nosostros</Link>
                 
               </div>
            </div>
            <div className="welcome-header-rigth">
              <div className="contenedor-img">
                 <Image alt='imagen home' className='imagen-home' src={ImagenHome}/>
              </div> 
            </div>
        </div>
     </header>
  )
}

export default Welcome