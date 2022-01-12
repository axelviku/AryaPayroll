
const nodemailer = require("nodemailer");

const fs = require('fs');
const path = require('path');
const ejs= require('ejs')
// var EmailTemplate = require("email-templates").EmailTemplate
var Template = path.join(__dirname, "../public/msg.ejs");

// var myTemplate = new EmailTemplate(Template);

var main = (to_mail, sub, msg) => {
  const testAccount = nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    auth: {
      user: 'vikrant.kumar@aryavratinfotech.com',
      pass: 'Vikrant@12345'
    }
  });

console.log("mailer");
  ejs.renderFile(Template,{msg:msg}, 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }else{
      console.log("mailer1");
    var mainOptions = ({
        from: '"Vikrant Kumar" <vikrant.kumar@aryavratinfotech.com>',
        to: `${to_mail}`,
        subject: `${sub}`,
        html: `${data}`
    });
    transporter.sendMail(mainOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    }
    
    // console.log(mainOptions.html);
  
  // const mailOptions = ({
  //   from: '"Vikrant Kumar " <vikrant.kumar@aryavratinfotech.com>', // sender address
  //   to: `${to_mail}`, // list of receivers
  //   subject: `${sub}`, // Subject line
  //   // text: {path: './public/msg.hbs' `${msg}`}, // plain text body
  //   // html: {path: './public/msg.hbs' },  //message part
  //   html: `${msg}`,
  // });
  
  
});
  // console.log(to_mail, sub, msg);
}


module.exports = main;