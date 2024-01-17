"use client";

import Image from "next/image";
import React from "react";
import "./Contact.css";
import ImagenContacto from "../../../../../public/images/home/contact.svg";

import { MdLocationPin } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Box, TextField } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";

//Para validar el formulario.
import { EmailFormValues } from "@/types/email";
import { EmailSchema } from "@/validations/emailSchema";
import { ZodError } from "zod";
import { useForm, Resolver, FieldErrors } from "react-hook-form";

const initValues = { name: "", email: "", mensaje: "" };
const initState = { values: initValues };

const Contact = () => {
  //Validacion del formulario.

  const resolver: Resolver<
    EmailFormValues,
    FieldErrors<EmailFormValues>
  > = async (data) => {
    try {
      // Validar los datos con zod
      await EmailSchema.parseAsync(data);
      // Devolver los valores correctamente
      return { values: data, errors: {} };
    } catch (error) {
      // Manejar errores de validación
      const zodError = error as ZodError;

      // Construir el objeto de errores
      const fieldErrors: FieldErrors<EmailFormValues> = {};
      zodError.errors.forEach((issue) => {
        if (issue.path) {
          // Asignar errores a los campos correspondientes
          const fieldName = issue.path[0] as keyof EmailFormValues;
          fieldErrors[fieldName] = {
            type: "validation", // Asegúrate de ajustar esto según tus necesidades
            message: issue.message ?? "Error de envio",
          };
        }
      });

      // Devolver los errores adaptados
      return { values: {}, errors: fieldErrors };
    }
  };

  // ...

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormValues>({
    resolver: resolver,
  });

  // Manejar la lógica de envío del formulario
  const onSubmit = (data: EmailFormValues) => {
    console.log("Formulario de email enviado:", data);
    // Aquí ira la lógica de email
  };

  /*-----------------*/
  const [loading, setLoading] = useState(false);

  async function hadleSubmit1(event: any) {
    event.preventDefault();
    setLoading(true);

    const data = {
      name: String(event.target.name.value),
      email: String(event.target.email.value),
      mensaje: String(event.target.mensaje.value),
    };

    if (!data.name.length || !data.email.length || !data.mensaje.length) {
      toast("Rellena todos los pinches campos", {
        style: {
          background: "#E83D21",
          color: "#FFFF",
        },
      });
      return;
    }
    console.log(data);
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Mensaje enviado");
      setLoading(false);
      event.target.name.value = "";
      event.target.email.value = "";
      event.target.mensaje.value = "";
      event.target.reset();
    }
    if (!response.ok) {
      console.log("Mensaje no enviado llaga");
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container contact-container">
        <div className="contact-form">
          <div className="contact-form-part1">
            <div className="texto-c">
              <h3>Contactanos.</h3>
              <p>Y comunicate con nosotros.</p>
            </div>
            <form id="formu" onSubmit={handleSubmit(onSubmit)}>
              <TextField
                id="name"
                label="Escribe tu nombre"
                variant="outlined"
                size="small"
                sx={{
                  mt: 5,
                  width: "90%",
                }}
                {...register("name")}
                error={!!errors.name}
                helperText={errors?.name?.message}
              />
              <TextField
                type="email"
                id="email"
                label="Escribe tu correo electronico"
                variant="outlined"
                size="small"
                sx={{
                  mt: 4,
                  width: "90%",
                }}
                {...register("email")}
                error={!!errors.email}
                helperText={errors?.email?.message}
              />
              <TextField
                id="mensaje"
                label="Escribe tu mensaje"
                multiline
                rows={4}
                size="small"
                sx={{
                  mt: 4,
                  width: "90%",
                }}
                {...register("mensaje")}
                error={!!errors.mensaje}
                helperText={errors?.mensaje?.message}
              />
              <input
                className="boton-base btn-enviar"
                type="submit"
                value="Enviar"
              />
            </form>
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
