const nodemailer = require("nodemailer");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: true }));

const auth = {
  type: "OAuth2",
  user: "sylvi.xw@gmail.com",
  clientId: process.env.ID,
  clientSecret: process.env.SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
  accessToken: process.env.ACCESSTOKEN
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
