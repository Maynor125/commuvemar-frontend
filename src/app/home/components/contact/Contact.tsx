"use client";

import Image from "next/image";
import React from "react";
import "./Contact.css";
import ImagenContacto from "../../../../../public/images/home/contact.svg";

import { MdLocationPin } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";


import EmailForm from "@/components/forms/EmailForm";

const initValues = { name: "", email: "", mensaje: "" };
const initState = { values: initValues };

const Contact = () => {

  return (
    <section id="contact" className="contact">
      <div className="container contact-container">
        <div className="contact-form">
          <div className="contact-form-part1">
            <div className="texto-c">
              <h3>Contactanos.</h3>
              <p>Y comunicate con nosotros.</p>
            </div>
            <EmailForm />
          </div>
          <div className="contact-form-part2">
            <div className="img-cont">
              <Image src={ImagenContacto} alt="imagen contato" />
            </div>
            <div className="cont-info">
              <div className="item-info">
                <div className="icon">
                  <MdLocationPin className="icon-c" />
                </div>
                <p>Costa caribe, Siuna, el limon</p>
              </div>
              <div className="item-info">
                <div className="icon">
                  <FaPhoneAlt className="icon-c" />
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
