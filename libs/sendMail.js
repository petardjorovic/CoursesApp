const nodemailer = require("nodemailer");
const path = require("path");
const { USER_MAIL, USER_MAIL_PASS } = require("./config");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: USER_MAIL,
        pass: USER_MAIL_PASS
    }
});

async function sendMail(to, activationLink){
    try {
        const sentMail = await transporter.sendMail({
            from: `"CoursesAPP" <${USER_MAIL}>`, // sender address
            to: to, // list of receivers
            subject: "Aktivacija", // Subject line
            text: "Hello world?", // plain text body
            html: `<b>Upravo ste se registrovali na nasoj platformi, potrebna je aktivacija. </b><br>
                   <b><a href="${activationLink}">Aktiviraj</a></b>
            `, // html body
            attachments: {   // file on disk as an attachment
                filename: 'node.png',
                path: path.resolve(__dirname + "/../public/assets/node.png") // stream this file
            }
        })
    } catch (error) {
        return new Error(error.message)
    }
}

module.exports = sendMail;