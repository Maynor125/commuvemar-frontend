"use client";

import Image from "next/image";
import React from "react";
import "./Contact.css";
import ImagenContacto from "../../../../../public/images/home/contact.svg";

import { MdLocationPin } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Box, TextField } from "@mui/material";
import {useState} from 'react'
import toast from 'react-hot-toast'




const Contact = () => {
  
  const [nombre,setNombre] = useState<string>('')
  const [email,setEmail] = useState<string>('')
  const [mensaje,setMensaje] = useState<string>('')

  function handleSubmit(event:any) {
    event.preventDefault()

    if (!nombre || !email || !mensaje) {
      toast('Rellena todos los pinches campos',{
        style:{
          background:'#E83D21',
          color:'#FFFF',
        }
      });
      return;
    }
    console.log(nombre,email,mensaje)
  }

  return (
    <section id='contact' className="contact">
      <div className="container contact-container">
        <div className="contact-form">
          <div className="contact-form-part1">
            <div className="texto-c">
            <h3>Contactanos.</h3>
            <p>Y comunicate con nosotros.</p>
            </div>
            <form id="formu"  onSubmit={handleSubmit}>
              <TextField
                id="outlined-basic"
                label="Escribe tu nombre"
                variant="outlined"
                size="small"
                sx={{
                  mt:5,
                  width:'90%',
                }}
                onChange={({target})=>setNombre(target.value)}
                value={nombre}
              />
              <TextField
                type="email"
                id="outlined-basic"
                label="Escribe tu correo electronico"
                variant="outlined"
                size="small"
                sx={{
                  mt:4,
                  width:'90%',
                }}
                onChange={({target})=>setEmail(target.value)}
                value={email}
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Escribe tu mensaje"
                multiline
                rows={4}
                size="small"
                sx={{
                  mt:4,
                  width:'90%',
                }
              }
              onChange={({target})=>setMensaje(target.value)}
                value={mensaje}
              />
              <input className="boton-base btn-enviar" type="submit" value="Enviar" />
            </form>
          </div>
          <div className="contact-form-part2">
            <div className="img-cont">
              <Image src={ImagenContacto} alt="imagen contato" />
            </div>
            <div className="cont-info">
              <div className="item-info">
                <div className="icon">
                  <MdLocationPin className="icon-c"  />
                </div>
                <p>Costa caribe, Siuna, el limon</p>
              </div>
              <div className="item-info">
                <div className="icon">
                  <FaPhoneAlt className="icon-c"  />
                </div>
                <p>+ 505 8366-2258</p>
              </div>
              <div className="item-info">
                <div className="icon">
                  <MdEmail className="icon-c" />
                </div>
                <p>coomuvermar@gmailcom</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
