const nodemailer = require("nodemailer");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());

const auth = {
  type: "OAuth2",
  user: "sylvi.xw@gmail.com",
  clientId:
    "1008859869282-0q2dd9i7iam02tpmul6otqu2gbmol8lk.apps.googleusercontent.com",
  clientSecret: "bajzK4W14OcuJ2U_ucE1x6Ms",
  refreshToken: "1/ddfxREeJDu-OHzmdjinV5b7yIeDaWcTx8Fd2HPKTkwg",
  accessToken:
    "ya29.GltcB6tTZ9NFf0TRmTfctMOiGGKyw_BD_4pJ3yMgIOjxUn-sRLW6z9FKxmqeQk1lu1UMLReNumoyFvQxMX3y0-NFhUTYvZqNs6jTlNHhj5KXGQ1Gxc8OqUPDPnc0"
};
const transport = {
  service: "gmail",
  auth: auth
};

const transporter = nodemailer.createTransport(transport);
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

app.get("/", (req, res) => {
  res.send("It worked");
});

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  let mailOptions = {
    from: "sylvi.xw@gmail.com",
    to: "sylvi.xw@gmail.com",
    subject: `New Message from ${name} : ${email} sending from my portfolio site`,
    text: message
  };
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      res.json({
        msg: "fail"
      });
    } else {
      res.json({
        msg: "success"
      });
    }
  });
});
app.listen(process.env.PORT || 3000, () => {
  console.log(`Running on Port ${process.env.PORT}`);
});
