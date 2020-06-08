'use strict';

const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: 'casalugo.com',
  port:465,
  secure: true,
  auth:{
    user:'prueba@cajetaslugo.com',
    pass:'Dioney1998!'
  }
});

function emailError(error){
  transport.sendMail({
    from:"Alerts API",
    to: "backend@prefix.xyz",
    subject: "Some Error/s!",
    text:error
  },(err,options)=>{
    if(err)console.error(err);
    process.exit(1);
  })
}

module.exports = emailError;
