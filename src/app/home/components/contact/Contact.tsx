
import Image from "next/image";
import React from "react";
import "./Contact.css";
import ImagenContacto from "../../../../../public/images/home/contact.svg";

import { MdLocationPin } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";


import EmailForm from "@/components/forms/EmailForm";
import { Box, Typography, useTheme } from "@mui/material";

const Contact = () => {
  const theme = useTheme()
  return (
    <Box component="section" bgcolor={theme.palette.background.default} id="contact" className="contact">
      <div className="container contact-container">
        <div className="box-with-shadow  contact-form">
          <div className="contact-form-part1">
            <div className="texto-c">
              <h3>Contactanos.</h3>
              <Typography color={theme.palette.secondary.light}>Y comunicate con nosotros.</Typography>
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
                <Typography color={theme.palette.secondary.contrastText}>Costa caribe, Siuna, el limon</Typography>
              </div>
              <div className="item-info">
                <div className="icon">
                  <FaPhoneAlt className="icon-c" />
                </div>
                <Typography color={theme.palette.secondary.contrastText}>+ 505 8366-2258</Typography>
              </div>
              <div className="item-info">
                <div className="icon">
                  <MdEmail className="icon-c" />
                </div>
                <Typography color={theme.palette.secondary.contrastText}>coomuvermar@gmailcom</Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Contact;
