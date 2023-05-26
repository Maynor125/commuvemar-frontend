import React, { useState } from 'react'
import { Services } from '../../data'
import Card from '@/components/Card'
import Image from 'next/image'
import './Service.css'


const Service = () => {
  return (
    <section id='services' className='service'>
       <div className="container service-container">
           <h2>Nuestros servicios</h2>
           <p>We provide to you the best choiches for you. Adjust it to your health needs and make sure your undergo treatment with our highly qualified doctors you can consult with us which type of service is suitable for your health</p>
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
    </section>
  )
}

export default Service