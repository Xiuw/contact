const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser=require('body-parser');
const cors = require('cors');


const app =express();
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
	res.send('It worked');
})

const transport = {
	service:"Gmail",
	auth:{
		user:process.env.MY_EMAIL,
		pass:process.env.MY_PASSWORD
	}
}

const transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

app.post('/contact', (req, res)=>{
  console.log("I got here");
  const {name, email, message} = req.body;
  console.log(name);
  let content = `name: ${name} \n email: ${email} \n message: ${message} `
  let mail = {
    from: name,
    to: process.env.MY_EMAIL,
    subject: 'New Message from Contact Form',
    text: content
  }
  transporter.sendMail(mail, (err, data) => {
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