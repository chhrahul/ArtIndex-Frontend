import React from 'react'
import nodemailer from 'nodemailer';
export default function Email() {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'chhabra.odesk.mca@gmail.com',
          pass: 'Softweavertech@*3205'
        }
      });
      const mailOptions = {
        from: 'chhabra.odesk.mca@gmail.com',
        to: 'kanika.softweaver@gmail.com',
        subject: 'Hello from Nodemailer',
        text: 'This is the body of the email'
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
            
  return (
    <div>
      
    </div>
  )
}
