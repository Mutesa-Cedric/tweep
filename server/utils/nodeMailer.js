const nodemailer=require("nodemailer")

//sending email

const sendEmail = async (email, subject, text) => {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: 587,
        service:process.env.SERVICE,
        secure: true,
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
      });
  
      await transporter.sendMail({
        from: process.env.USER,
        to: email,
        subject: subject,
        // text: text,
        html:`<a href="${text}">verify account</a>`
      });
      console.log("email sent sucessfully");
    } catch (error) {
      console.log("email not sent");
      console.log(error);
    }
  };
  module.exports.sendEmail = sendEmail;

//sending email
