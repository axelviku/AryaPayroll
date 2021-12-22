const express = require('express');
const router = new express.Router();
const Student = require("../models/user");
const { success, error } = require("./mesage");
const main = require("./mailer");
const jwt = require('jsonwebtoken');
const cookieParsar = require("cookie-parser");
const session = require('express-session');
const { response } = require('express');



const register = async (req, res) => {
  try {
    //console.log(req.body);
    const email3 = req.body.email;
    // const mobile1 = req.body.mobile;
    if (await Student.findOne({ email: email3 })) {
      res.send(error("Email Already exist"));
      // } else if (await Student.findOne({ mobile: mobile1 })) {
      //     res.send(fail("Mobile number Already exist"));
    } else {
      try {
        const redirectUrl = req.body.redirectUrl;
        const st1 = new Student({
          // username: req.body.username,
          email: req.body.email,
          // mobile: req.body.mobile,
          // password: req.body.password
        });

        // await st1.generateAuthToken();
        const createSt = await st1.save();
        // const rootUrl = `${req.protocol}://${req.get("host")}`;
        
         const newRegistrationUrl = `${redirectUrl}/${encodeURIComponent(
          createSt.registrationToken.token
          )}?on=register`;
          
        (main(st1.email, "link", newRegistrationUrl));
        
        // var session = req.session;
        // session.tokens= createSt.tokens[0].token;

        // console.log(req.session.token);

        res.send(success(`An email validation link was just emailed to you at ${req.body.email}, please verify your email and follow the instructions to complete your registration.
          We're happy to have you as part of our community!`, st1));
      } catch (err) {
        res.send(error("Registration not Successfull..!!"));
      }
    }
  } catch (err) {
    res.send(error("Technical Error"));
  }
}


module.exports = register;