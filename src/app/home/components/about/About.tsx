
import Image from 'next/image'
import React from 'react'
import './About.css'
import ImagenAbout from '../../../../../public/images/home/imagen-about-2.jpeg'
import Link from 'next/link'
import IconoCacao from '../../../../../public/images/home/icono-cacao.png'

const About = () => {
  return (
    <section id='about' className="about">
       <div className="container about-container">
           <div className="about-container-left">
               <h4>¿Quienes somos?</h4>
               <h2>Como coomuvemar</h2>

               <p>Contamos con la certificación, que es un proceso de producir de manera sostenible con el Medio Ambiente, gestión de calidad, gestión ambiental además de que la certificación es una garantía para los consumidores y coomuvemar cuenta con dos.</p>

               <div className="targeta-about">
                      <div className="part-superior">
                          <h4>Certificado Rainforest Alliance</h4>
                          <div className="icono">
                             <Image alt='icono-cacao' src={IconoCacao}/>
                          </div>
                      </div>
                      <p>Ayuda a los agricultores a producir mejores cultivos, adaptarse al cambio climático, aumentar su productividad y reducir costos.</p>
               </div>
               <div className="targeta-about">
                      <div className="part-superior">
                          <h4>Certificado organico</h4>
                          <div className="icono">
                          <Image alt='icono-cacao' src={IconoCacao}/>
                          </div>
                      </div>
                      <p>Una herramienta que garantiza confianza al consumidor de que lo que está comprando es realmente de origen orgánico.</p>
               </div>
               <Link href='#services' className='boton-base boton-about'>
                 Consulta...
               </Link>
           </div>
           <div className="about-container-rigth">
                <div className="cont-img">
                  <Image src={ImagenAbout} className='imagen-about' alt='imagen de productores de cacao'/>
                  <div className="mensaje-flotante">
                  <h4>¿En busca de ayuda?</h4>
                  <p>Contamos con tecnicos que le brindaran ayuda de manera amigable.</p>
                </div>
                </div>
                
           </div>
       </div>
    </section>
  )
}

export default About