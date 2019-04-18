const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser=require('body-parser');
const cors = require('cors');
const app =express();

app.use(bodyParser.json());
app.use(cors());

const transport = {
	service:"Gmail",
	auth:{
		user:"sylvi.xw@gmail.com",
		pass:process.env.PASSWORD
	}
}
const transporter = nodemailer.createTransport(transport)
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
    res.send('Login')
  }
});

app.get('/',(req,res)=>{
  res.send('It worked');
})

app.post('/contact', (req, res)=>{
  const {name, email, message} = req.body;
  let content = `name: ${name} \n email: ${email} \n message: ${message} `
  let mail = {
    from: name,
    to:"sylvi.xw@gmail.com",
    subject: 'New Message from Contact Form',
    text: content
  }
  transporter.sendMail(mail, (err, data) => {
    res.send(mail);
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
})

app.listen(process.env.PORT || 3000,()=>{
	console.log(`Running on Port ${process.env.Port}`);
})
