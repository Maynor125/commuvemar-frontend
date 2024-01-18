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
        subject: `Mensaje Coomuvemar de ${name}`,
        html:`
        <html>
          <head>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                border:2px solid #4FBD55;
              }
              .welcome {
                font-size: 20px;
                color: #333;
              }
              .message-info {
                margin-top: 15px;
                font-size: 16px;
                color: #555;
              }
              .logo {
                max-width: 100px;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <p class="welcome">Bienvenido ${name}</p>
              <p class="message-info">Gracias por contactarnos. Aquí está tu mensaje:</p>
              <p class="message-info"><strong>Nombre:</strong> ${name}</p>
              <p class="message-info"><strong>Email:</strong> ${email}</p>
              <p class="message-info"><strong>Mensaje:</strong> ${mensaje}</p>
              <!-- Puedes incluir el logo de tu aplicación aquí -->
              <img class="logo" src="https://1drv.ms/i/s!AjP0HSmdrBx_jqMJCvT7dldWkHMFLw?e=pLDjaW" alt="Logo de la aplicación">
            </div>
          </body>
        </html>
      `
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