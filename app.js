const express = require('express')

const dotenv = require('dotenv')
const nodeMailer = require('nodemailer')
const bodyParser = require("body-parser");

const app = express();

const cors =require('cors');

app.use(cors({
    origin: "http://localhost:3000"
}))
dotenv.config({path:"config/config.env"});
app.use(express.json());

app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.post("/api/send", async(req, res) => {
    
    const transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure:false,
        service: process.env.SMPT_SERVICE,
        auth:{
            user:'sangeetadevimummy@gmail.com',            // SMPT ==== simple mail transfer protocol
            pass:process.env.SMPT_PASSWORD,
        }
    })
    const mailOptions = {
      from: req.body.mail,
      to: process.env.SMPT_MAIL,
      subject: 'PortFolio-Connect',
      text: req.body.message
    };

     await transporter.sendMail(mailOptions)
  });

const server = app.listen(process.env.PORT, ()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})
