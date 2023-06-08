let nodemailer= require('nodemailer');

export const POST = async(req:any, res:any)=>{
  const {name, email, mensaje} = req.body;
  const user = process.env.USER_E;

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
        text: `Nombre: ${data.name}\nEmail: ${data.email}\nMensaje: ${data.mensaje}`
    })

    console.log("Sent mail:",mail.messageId)
    return res.status(200).json({message:'Success'})
    
  } catch (error) {
     console.log(error)
     return res.status(500).json({
         message: 'Error en el servidor'
     })
  }
}