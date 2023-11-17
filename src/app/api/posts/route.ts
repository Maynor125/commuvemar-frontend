import { NextResponse } from "next/server";

let nodemailer= require('nodemailer');

export const POST = async(req:any, res:any)=>{
  const {name, email, mensaje} = await req.json();
  const user = process.env.USER_E;

  console.log(name, email, mensaje)
  const data={
      name,
      email,
      mensaje
  }
  const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: user,
        pass: process.env.USER_P
    }
  })

  try {
    const mail = await transporter.sendMail({
        from: user,
        to: 'maynoldemar@gmail.com',
        replyTo: email, 
        subject: `Mensaje Coomuvemar de el crack ${name}`,
        text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${mensaje}`
    })

    console.log("Sent mail:",mail.messageId)
    return new NextResponse("Mensaje enviado",{status: 200})
    
  } catch (error) {
     console.log(error)
     return res.status(500).json({
         message: 'Error en el servidor'
     })
  }
}