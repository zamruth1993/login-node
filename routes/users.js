var express = require('express');
var usersRouter = express.Router();
var cors = require('./../cors');
var nodemailer = require('nodemailer');

usersRouter.route('/')
.options(cors.cors,(req,res)=>{
    console.log("Coming email here");
    res.sendStatus(200);
})

// route which captures form details and sends it to your personal mail
.post(cors.cors,(req,res,next)=>{
  
  console.log("oooo",req.body.email.emailAddress)
  
  /*Transport service is used by node mailer to send emails, it takes service and auth object as parameters.
    here we are using gmail as our service 
    In Auth object , we specify our email and password
  */
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: true,
    requireTLS: true,
    tls:{
      rejectUnauthorized:false
  },
  // details created using app password feature
    auth: {
      user: 'zamruthbegum.1993.sm@gmail.com',
      pass: 'odalcvyaizchkxya'
    }
  }); 

  /*
    In mail options we specify from and to address, subject and HTML content.
    Here i have given my personal email as from and to address is the user email id,
    Subject is Contact name and html is a template.
  */
    
  var mailOptions = {
    from: 'zamruthbegum.1993.sm@gmail.com',
    to: req.body.email.emailAddress,
    subject: `Welcome` +'  ' + req.body.email.firstname ,
    html:`<b>Hello, <strong> New User </strong>, 
          Thanks for registering \n<b> with us. </b></p>`,

  };
  
  /* sendMail is the method which actually sends email, it takes mail options and call back as parameter */

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.send('error') // if error occurs send error as response to client
    } else {
      console.log('Email sent: ' + info.response);
      res.json('Sent successfully') //if mail is sent successfully send Sent successfully as response
    }
  });
})


module.exports = usersRouter;
